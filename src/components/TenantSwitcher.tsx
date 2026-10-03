import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type ReactElement } from 'react';
import { signet, signetJson } from '../signet/client';
import { useFluentConfig, useSignetQuery } from '../signet/provider';
import { Input } from './Input';
import { Modal, ModalFooter } from './Modal';
import { OrganisationAvatar } from './OrganisationAvatar';

type TenantList = { current: string | null; items: TenantItem[] };
type TenantItem = { name: string; role: string; uuid: string };

export const TenantSwitcher = ({ collapsed = false }: { collapsed?: boolean }): ReactElement => {
  const config = useFluentConfig();
  const queryClient = useQueryClient();
  const tenants = useSignetQuery<TenantList>(['tenants'], signet.listTenants(), true);
  const items = tenants.data?.items ?? [];
  const current = tenants.data?.current ?? '';
  const selected = items.find((item) => item.uuid === current) ?? items[0];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const tenant = params.get('tenant');
    const token = config.token();

    if (!sessionId || !tenant || !token) return;

    void signetJson(config.endpoint, token, signet.selectTenant({ uuid: tenant }))
      .then(() => signetJson(config.endpoint, token, signet.confirmTenantSubscription({ sessionId, tenantId: tenant })))
      .finally(() => {
      window.location.replace('/');
    });
  }, [config]);

  const choose = (uuid: string) => {
    const token = config.token();

    if (!token) return;

    void signetJson(config.endpoint, token, signet.selectTenant({ uuid })).then(() => {
      void queryClient.invalidateQueries({ queryKey: ['signet'] });
      window.location.assign('/');
    });
  };

  const create = async () => {
    const token = config.token();

    if (!token || name.trim() === '') return;

    setSaving(true);

    try {
      const created = await signetJson<{ checkoutUrl: string | null; tenant: TenantItem }>(
        config.endpoint,
        token,
        signet.createTenant({
          billingAddressLine1: line1,
          billingCity: city,
          billingPostcode: postcode,
          name,
          returnUrl: window.location.origin,
        }),
      );

      await signetJson(config.endpoint, token, signet.selectTenant({ uuid: created.tenant.uuid }));

      if (created.checkoutUrl) {
        window.location.assign(created.checkoutUrl);

        return;
      }

      window.location.assign('/');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton aria-label="Switch tenant" className="flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] bg-secondary px-2 py-2 text-left outline-none transition hover:bg-white/10">
          <OrganisationAvatar name={selected?.name ?? 'Tenant'} />
          {collapsed ? null : (
            <>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{selected?.name ?? 'No tenant'}</span>
              <ChevronDownIcon className="size-4 shrink-0 text-subtle" />
            </>
          )}
        </MenuButton>
        <MenuItems portal anchor={{ to: 'bottom start', gap: 6 }} className="z-50 flex min-w-56 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none">
          <div className="max-h-72 overflow-y-auto p-1.5">
            {items.map((item) => (
              <MenuItem key={item.uuid}>
                <button type="button" className="flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white" onClick={() => choose(item.uuid)}>
                  <OrganisationAvatar name={item.name} />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  {item.uuid === selected?.uuid ? <CheckIcon className="size-4 shrink-0 text-orange-100" /> : null}
                </button>
              </MenuItem>
            ))}
          </div>
          <div className="border-t border-line p-1.5">
            <MenuItem>
              <button type="button" className="flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-low-priority data-focus:bg-white/5 data-focus:text-white" onClick={() => setOpen(true)}>
                <PlusIcon className="size-4 shrink-0" />
                <span>Add tenant</span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <Modal
        footer={(
          <ModalFooter
            onCancel={() => setOpen(false)}
            onPrimary={() => void create()}
            primaryDisabled={saving || name.trim() === ''}
            primaryLabel={saving ? 'Saving…' : 'Create tenant'}
            primaryLoading={saving}
          />
        )}
        onClose={() => setOpen(false)}
        open={open}
        title="Add tenant"
      >
        <div className="flex flex-col gap-3 p-5">
          <Input label="Name" name="tenant-name" onChange={(event) => setName(event.target.value)} value={name} />
          <Input label="Address" name="tenant-address" onChange={(event) => setLine1(event.target.value)} value={line1} />
          <Input label="City" name="tenant-city" onChange={(event) => setCity(event.target.value)} value={city} />
          <Input label="Postcode" name="tenant-postcode" onChange={(event) => setPostcode(event.target.value)} value={postcode} />
        </div>
      </Modal>
    </>
  );
};
