import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type ReactElement } from 'react';
import { Input } from './Input';
import { Pill } from './Pill';
import { Select } from './Select';
import { TableColumns, TableContainer, TablePagination, TableRows } from './Table';
import { downloadCsv, downloadPdf } from './tableExport';

export type XeroInvoice = {
  clientId: string;
  createdAt: string;
  description: string | null;
  gross: number;
  net: number;
  provider: 'stripe' | 'xero';
  tax: number;
  url: string;
  uuid: string;
};

const providerColours: Record<XeroInvoice['provider'], string> = {
  stripe: '#635BFF',
  xero: '#3B82F6',
};

const money = (amount: number): string =>
  `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const descriptionOf = (invoice: XeroInvoice): string => invoice.description ?? invoice.uuid;

export const XeroInvoicesList = ({
  client,
  clients,
  invoices,
  onClientChange,
}: {
  client?: string;
  clients?: string[];
  invoices: XeroInvoice[];
  onClientChange?: (client: string) => void;
}): ReactElement => {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const needle = query.trim().toLowerCase();
  const filtered = invoices.filter((invoice) => {
    const matchesQuery = needle === '' || descriptionOf(invoice).toLowerCase().includes(needle);
    const matchesProvider = provider === '' || invoice.provider === provider;

    return matchesQuery && matchesProvider;
  });
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const showClient = clients !== undefined;
  const headers = showClient
    ? ['Date', 'Description', 'Client', 'Source', 'Gross', 'Tax', 'Net']
    : ['Date', 'Description', 'Source', 'Gross', 'Tax', 'Net'];
  const exportRows = filtered.map((invoice) => [
    new Date(invoice.createdAt).toLocaleDateString('en-GB'),
    descriptionOf(invoice),
    ...(showClient ? [invoice.clientId] : []),
    invoice.provider === 'stripe' ? 'Stripe' : 'Xero',
    money(invoice.gross),
    money(invoice.tax),
    money(invoice.net),
  ]);

  return (
    <TableContainer
      className="min-h-0 flex-1"
      flush
      title="Invoices"
      toolbar={
        <Menu>
          <MenuButton className="flex h-10 shrink-0 items-center gap-2 rounded-[2px] border border-grey-700t px-4 text-sm font-bold text-low-priority outline-none hover:bg-white/5">
            <ArrowDownTrayIcon aria-hidden="true" className="size-[18px]" />
            Export
          </MenuButton>
          <MenuItems portal anchor={{ to: 'bottom end', gap: 6 }} className="z-50 min-w-36 rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none">
            <MenuItem>
              <button type="button" className="w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5" onClick={() => downloadCsv('invoices.csv', headers, exportRows)}>
                CSV
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  void downloadPdf('invoices.pdf', 'Invoices', headers, exportRows);
                }}
              >
                PDF
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-grey-700t px-5 py-3">
        <Input
          name="invoiceQuery"
          Icon={MagnifyingGlassIcon}
          value={query}
          placeholder="Search for invoices"
          className="w-full sm:w-72"
          onChange={(event) => {
            setPage(1);
            setQuery(event.target.value);
          }}
        />
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
          {showClient ? (
            <Select
              placeholder="All clients"
              widthClass="w-44"
              value={client ?? ''}
              onChange={(value) => onClientChange?.(value)}
              options={[{ value: '', label: 'All clients' }, ...clients.map((id) => ({ value: id, label: id }))]}
            />
          ) : null}
          <Select
            placeholder="All sources"
            widthClass="w-40"
            value={provider}
            onChange={(value) => {
              setPage(1);
              setProvider(value);
            }}
            options={[
              { value: '', label: 'All sources' },
              { value: 'xero', label: 'Xero' },
              { value: 'stripe', label: 'Stripe' },
            ]}
          />
        </div>
      </div>
      <TableColumns
        widthType="pc"
        columns={[
          { width: showClient ? 12 : 14, heading: 'Date' },
          { width: showClient ? 20 : 26, heading: 'Description' },
          ...(showClient ? [{ width: 12, heading: 'Client' }] : []),
          { width: 12, heading: 'Source' },
          { width: 12, heading: 'Gross' },
          { width: 12, heading: 'Tax' },
          { width: 12, heading: 'Net' },
          { width: 12 },
        ]}
      />
      {visible.length === 0 ? (
        <p className="p-4 text-subtle">No invoices yet.</p>
      ) : (
        <TableRows
          widthType="pc"
          rows={visible.map((invoice) => ({
            uuid: invoice.uuid,
            cells: [
              { width: showClient ? 12 : 14, content: new Date(invoice.createdAt).toLocaleDateString('en-GB') },
              { width: showClient ? 20 : 26, content: descriptionOf(invoice) },
              ...(showClient ? [{ width: 12, content: invoice.clientId }] : []),
              {
                width: 12,
                content: (
                  <Pill
                    size="small"
                    colour={providerColours[invoice.provider]}
                    text={invoice.provider === 'stripe' ? 'Stripe' : 'Xero'}
                    outline
                  />
                ),
              },
              { width: 12, content: money(invoice.gross) },
              { width: 12, content: money(invoice.tax) },
              { width: 12, content: money(invoice.net) },
              {
                width: 12,
                wrapperClassname: 'justify-end',
                content: (
                  <a aria-label="Open invoice" className="text-subtle hover:text-white" href={invoice.url} rel="noreferrer" target="_blank">
                    <ArrowTopRightOnSquareIcon className="size-4" />
                  </a>
                ),
              },
            ],
          }))}
        />
      )}
      <TablePagination
        page={page}
        perPage={perPage}
        total={filtered.length}
        onPageChange={setPage}
        onPerPageChange={(next) => {
          setPage(1);
          setPerPage(next);
        }}
      />
    </TableContainer>
  );
};
