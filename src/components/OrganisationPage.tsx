import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  IdentificationIcon,
  LinkIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type ReactElement, type ReactNode } from 'react';
import { useDirectory, useFluentConfig, useSignetMutation, useSignetQuery } from '../signet/provider';
import { PageHeader } from './AppFrame';
import { CountrySelect, countryName, countryValue } from './CountrySelect';
import { Input } from './Input';
import { FullLoader } from './Loader';
import { Modal, ModalFooter } from './Modal';

type Organisation = {
  billingAddressLine1: string | null;
  billingAddressLine2: string | null;
  billingCity: string | null;
  billingContactFirstName: string | null;
  billingContactLastName: string | null;
  billingCountry: string | null;
  billingCounty: string | null;
  billingEmail: string | null;
  billingPostcode: string | null;
  name: string;
  registeredCompanyName: string | null;
  registeredCompanyNumber: string | null;
  stripeCustomerId: string | null;
  stripeDefaultPaymentMethodId: string | null;
  taxId: string | null;
  uuid: string;
  website: string | null;
};

type OrganisationForm = {
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingContactFirstName: string;
  billingContactLastName: string;
  billingCountry: string;
  billingCounty: string;
  billingEmail: string;
  billingPostcode: string;
  name: string;
  registeredCompanyName: string;
  registeredCompanyNumber: string;
  taxId: string;
  website: string;
};

const blank: OrganisationForm = {
  billingAddressLine1: '',
  billingAddressLine2: '',
  billingCity: '',
  billingContactFirstName: '',
  billingContactLastName: '',
  billingCountry: '',
  billingCounty: '',
  billingEmail: '',
  billingPostcode: '',
  name: '',
  registeredCompanyName: '',
  registeredCompanyNumber: '',
  taxId: '',
  website: '',
};

const fields = [
  ['name', 'Name'],
  ['registeredCompanyName', 'Registered company name'],
  ['website', 'Website'],
  ['billingEmail', 'Billing email'],
  ['billingContactFirstName', 'Billing contact first name'],
  ['billingContactLastName', 'Billing contact last name'],
  ['registeredCompanyNumber', 'Company number'],
  ['taxId', 'Tax ID / VAT'],
  ['billingAddressLine1', 'Billing line 1'],
  ['billingAddressLine2', 'Billing line 2'],
  ['billingCity', 'City'],
  ['billingCounty', 'County'],
  ['billingPostcode', 'Postcode'],
  ['billingCountry', 'Country'],
] as const;

const emptyToNull = (value: string): string | null => {
  const trimmed = value.trim();

  return trimmed === '' ? null : trimmed;
};

const menuItemClassName =
  'flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white';

const OrgField = ({
  Icon,
  label,
  value,
}: {
  Icon: HeroIconType;
  label: string;
  value: ReactNode;
}): ReactElement => (
  <div>
    <dt className="text-xs leading-[18px] text-low-priority">{label}</dt>
    <dd className="mt-2 flex min-w-0 items-center gap-2 text-sm text-white">
      <Icon className="size-4 shrink-0 text-low-priority" aria-hidden="true" />
      <span className="min-w-0">{value}</span>
    </dd>
  </div>
);

export const OrganisationPage = ({ aside }: { aside?: ReactNode }): ReactElement => {
  const { organisationClaim } = useFluentConfig();
  const { organisationUuid, user } = useDirectory();
  const membership = user.organisations.find((organisation) => organisation.uuid === organisationUuid);
  const canManage = membership?.claims.includes(organisationClaim) ?? false;
  const organisation = useSignetQuery<Organisation>(
    ['organisation', organisationUuid],
    `/api/resources/organisations/${organisationUuid}`,
    organisationUuid !== '' && canManage,
  );
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<OrganisationForm>(blank);
  const [saving, setSaving] = useState(false);
  const record = organisation.data;

  const openEdit = () => {
    if (!record) return;

    setForm({
      billingAddressLine1: record.billingAddressLine1 ?? '',
      billingAddressLine2: record.billingAddressLine2 ?? '',
      billingCity: record.billingCity ?? '',
      billingContactFirstName: record.billingContactFirstName ?? '',
      billingContactLastName: record.billingContactLastName ?? '',
      billingCountry: countryValue(record.billingCountry),
      billingCounty: record.billingCounty ?? '',
      billingEmail: record.billingEmail ?? '',
      billingPostcode: record.billingPostcode ?? '',
      name: record.name,
      registeredCompanyName: record.registeredCompanyName ?? '',
      registeredCompanyNumber: record.registeredCompanyNumber ?? '',
      taxId: record.taxId ?? '',
      website: record.website ?? '',
    });
    setEditing(true);
  };

  const address = record
    ? [record.billingAddressLine1, record.billingAddressLine2, record.billingCity, record.billingCounty, record.billingPostcode, countryName(record.billingCountry)]
        .map((part) => part?.trim())
        .filter((part) => part)
        .join(', ')
    : '';
  const contact = record
    ? [record.billingContactFirstName, record.billingContactLastName].filter(Boolean).join(' ')
    : '';

  if (!canManage) {
    return <p className="p-6 text-sm text-subtle">You do not have access to this organisation.</p>;
  }

  const website = record?.website?.trim() ?? '';
  const websiteHref = /^https?:\/\//i.test(website) ? website : `https://${website}`;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <PageHeader title="Organisation" />
      {record ? (
        <div className="border-b border-grey-700t px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 truncate font-grotesque text-[30px] font-semibold leading-9 text-white">{record.name}</h2>
            <Menu>
              <MenuButton aria-label="Organisation actions" className="rounded-[2px] p-2 text-subtle outline-none transition hover:bg-white/5 hover:text-white">
                <EllipsisVerticalIcon className="size-5" />
              </MenuButton>
              <MenuItems portal anchor={{ to: 'bottom end', gap: 6 }} className="z-50 min-w-44 rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-hidden">
                <div className="p-1.5">
                  <MenuItem>
                    <button type="button" className={menuItemClassName} onClick={openEdit}>
                      Edit organisation
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
          {website !== '' || address !== '' ? (
            <div className="mt-4 flex flex-col gap-2 text-sm text-subtle">
              {website !== '' ? (
                <a className="inline-flex w-fit max-w-full items-center gap-2 transition hover:text-white" href={websiteHref} rel="noopener noreferrer" target="_blank">
                  <LinkIcon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 break-all">{website}</span>
                  <ArrowTopRightOnSquareIcon className="size-4 shrink-0" aria-hidden="true" />
                </a>
              ) : null}
              {address !== '' ? (
                <p className="flex items-start gap-2">
                  <MapPinIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{address}</span>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={aside ? 'grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-grey-700t' : ''}>
        {record ? (
          <section className="px-5 py-5">
            <h3 className="mb-5 font-grotesque text-2xl/7 font-semibold text-white">Account</h3>
            <dl className="flex max-w-xl flex-col gap-5">
              <OrgField Icon={BuildingOfficeIcon} label="Registered company" value={record.registeredCompanyName ?? '—'} />
              <OrgField Icon={UserCircleIcon} label="Account manager" value={contact !== '' ? contact : '—'} />
              <OrgField Icon={EnvelopeIcon} label="Billing email" value={record.billingEmail ?? '—'} />
              <OrgField Icon={IdentificationIcon} label="Company number" value={record.registeredCompanyNumber ?? '—'} />
              <OrgField Icon={IdentificationIcon} label="Tax ID / VAT" value={record.taxId ?? '—'} />
            </dl>
          </section>
        ) : (
          organisation.isPending ? <FullLoader /> : <p className="p-6 text-sm text-subtle">This organisation is not available.</p>
        )}
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit organisation"
        panelClassName="w-full max-w-2xl"
        footer={
          <ModalFooter
            onCancel={() => setEditing(false)}
            primaryLabel={saving ? 'Saving...' : 'Save'}
            primaryLoading={saving}
            primaryDisabled={form.name.trim() === '' || saving}
            onPrimary={() => {
              setSaving(true);
              void mutate(`/api/resources/organisations/${organisationUuid}`, {
                method: 'PATCH',
                body: JSON.stringify({
                  billingAddressLine1: emptyToNull(form.billingAddressLine1),
                  billingAddressLine2: emptyToNull(form.billingAddressLine2),
                  billingCity: emptyToNull(form.billingCity),
                  billingContactFirstName: emptyToNull(form.billingContactFirstName),
                  billingContactLastName: emptyToNull(form.billingContactLastName),
                  billingCountry: emptyToNull(form.billingCountry),
                  billingCounty: emptyToNull(form.billingCounty),
                  billingEmail: emptyToNull(form.billingEmail),
                  billingPostcode: emptyToNull(form.billingPostcode),
                  name: form.name.trim(),
                  registeredCompanyName: emptyToNull(form.registeredCompanyName),
                  registeredCompanyNumber: emptyToNull(form.registeredCompanyNumber),
                  taxId: emptyToNull(form.taxId),
                  website: emptyToNull(form.website),
                }),
              })
                .then(() => {
                  setEditing(false);
                  return queryClient.invalidateQueries({ queryKey: ['signet', 'organisation', organisationUuid] });
                })
                .catch(() => undefined)
                .finally(() => setSaving(false));
            }}
          />
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map(([key, label]) =>
            key === 'billingCountry' ? (
              <CountrySelect
                key={key}
                label={label}
                name={key}
                value={form.billingCountry}
                onChange={(value) => setForm((current) => ({ ...current, billingCountry: value }))}
              />
            ) : (
              <Input
                key={key}
                label={label}
                name={key}
                value={form[key]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              />
            ),
          )}
        </div>
      </Modal>
    </section>
  );
};
