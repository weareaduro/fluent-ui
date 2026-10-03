import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type ReactElement } from 'react';
import { useDirectory, useSignetMutation, useSignetQuery } from '../signet/provider';
import { FullLoader } from './Loader';
import { Input } from './Input';
import { Pill } from './Pill';
import { Select } from './Select';
import { TableColumns, TableContainer, TablePagination, TableRows } from './Table';
import { downloadCsv, downloadPdf } from './tableExport';

type Period = '7d' | '30d' | '90d' | 'all' | 'lastMonth' | 'month' | 'week';

type TransactionType = 'credit' | 'debit' | 'stripe_payment' | 'xero_invoice';

type Transaction = {
  clientId: string;
  createdAt: string;
  description: string | null;
  gross: number;
  net: number;
  repository: string | null;
  title: string | null;
  type: TransactionType;
  uuid: string;
  vat: number;
};

type TransactionResponse = {
  clients?: string[];
  items: Transaction[];
  pagination: { lastPage: number; page: number; perPage: number; total: number };
  repositories: string[];
};

const typeLabels: Record<TransactionType, { colour: string; label: string }> = {
  stripe_payment: { label: 'Payment', colour: '#3EB077' },
  xero_invoice: { label: 'Invoice', colour: '#3B82F6' },
  credit: { label: 'Credit', colour: '#3EB077' },
  debit: { label: 'Debit', colour: '#EF4444' },
};

const periodOptions: Array<{ label: string; value: Period }> = [
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'lastMonth', label: 'Last month' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

const money = (amount: number): string =>
  `£${Math.abs(amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const isoDate = (date: Date): string => date.toISOString().slice(0, 10);

const formatExportDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

const periodRange = (period: Period): { from?: string; to?: string } => {
  if (period === 'all') return {};

  const to = new Date();
  const from = new Date();

  if (period === 'week') {
    const weekday = from.getUTCDay();

    from.setUTCDate(from.getUTCDate() - (weekday === 0 ? 6 : weekday - 1));
  } else if (period === '7d') {
    from.setUTCDate(from.getUTCDate() - 6);
  } else if (period === '90d') {
    from.setUTCDate(from.getUTCDate() - 89);
  } else if (period === 'month') {
    from.setUTCDate(1);
  } else if (period === 'lastMonth') {
    const start = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth() - 1, 1));
    const end = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));

    return { from: isoDate(start), to: isoDate(end) };
  } else {
    from.setUTCDate(from.getUTCDate() - 29);
  }

  return { from: isoDate(from), to: isoDate(to) };
};

const headers = ['Date', 'Title', 'Description', 'Client', 'Type', 'Spend', 'Tax', 'Total'];

export const TransactionsList = ({
  appClientId,
  canFilterClients,
  organisationUuid,
}: {
  appClientId: string;
  canFilterClients: boolean;
  organisationUuid: string;
}): ReactElement => {
  const [query, setQuery] = useState('');
  const [client, setClient] = useState('');
  const [type, setType] = useState('');
  const [period, setPeriod] = useState<Period>('month');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const range = periodRange(period);
  const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });

  if (canFilterClients) {
    if (client !== '') params.set('client', client);
  } else if (appClientId !== '') {
    params.set('client', appClientId);
  }

  if (query.trim() !== '') params.set('query', query.trim());

  if (type !== '') params.set('type', type);

  if (range.from) params.set('from', range.from);

  if (range.to) params.set('to', range.to);

  const { currentOrganisation } = useDirectory();
  const mutate = useSignetMutation();
  const result = useSignetQuery<TransactionResponse>(
    ['billing-transactions', organisationUuid, params.toString()],
    `/api/resources/organisations/${organisationUuid}/transactions?${params.toString()}`,
    organisationUuid !== '' && (canFilterClients || appClientId !== ''),
  );

  if (result.isPending) return <FullLoader />;

  if (result.isError || !result.data) return <p className="p-5 text-sm text-subtle">Transactions could not be loaded.</p>;

  const exportRows = async (): Promise<string[][]> => {
    const collected: string[][] = [];
    let nextPage = 1;
    let lastPage = 1;

    do {
      const exportParams = new URLSearchParams(params);

      exportParams.set('page', String(nextPage));
      exportParams.set('perPage', '100');

      const body = await mutate<TransactionResponse>(
        `/api/resources/organisations/${organisationUuid}/transactions?${exportParams.toString()}`,
        { method: 'GET' },
      );

      lastPage = body.pagination.lastPage;

      for (const entry of body.items) {
        const debit = entry.gross < 0;

        collected.push([
          new Date(entry.createdAt).toLocaleDateString('en-GB'),
          entry.title ?? '-',
          entry.description ?? '-',
          entry.clientId,
          typeLabels[entry.type].label,
          money(entry.net),
          money(entry.vat),
          `${debit ? '-' : '+'}${money(entry.gross)}`,
        ]);
      }

      nextPage += 1;
    } while (nextPage <= lastPage);

    return collected;
  };

  return (
    <TableContainer
      className="min-h-0 flex-1"
      flush
      title="Transactions"
      toolbar={
        <Menu>
          <MenuButton className="flex h-10 shrink-0 items-center gap-2 rounded-[2px] border border-grey-700t px-4 text-sm font-bold text-low-priority outline-none hover:bg-white/5">
            <ArrowDownTrayIcon aria-hidden="true" className="size-[18px]" />
            Export
          </MenuButton>
          <MenuItems portal anchor={{ to: 'bottom end', gap: 6 }} className="z-50 min-w-36 rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none">
            <MenuItem>
              <button
                type="button"
                className="w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  void exportRows().then((exported) => downloadCsv('transactions.csv', headers, exported));
                }}
              >
                CSV
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="button"
                className="w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  void exportRows().then((exported) =>
                    downloadPdf('transactions.pdf', 'Transactions', headers, exported, {
                      organisationName: currentOrganisation?.name ?? 'Organisation',
                      periodLabel: range.from && range.to ? `${formatExportDate(range.from)} – ${formatExportDate(range.to)}` : 'All time',
                    }),
                  );
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
          name="transactionQuery"
          Icon={MagnifyingGlassIcon}
          value={query}
          placeholder="Search descriptions"
          className="w-full sm:w-72"
          onChange={(event) => {
            setPage(1);
            setQuery(event.target.value);
          }}
        />
        <div className="flex flex-wrap items-center justify-end gap-3">
          {canFilterClients ? (
            <Select
              placeholder="All clients"
              widthClass="w-44"
              value={client}
              onChange={(value) => {
                setPage(1);
                setClient(value);
              }}
              options={[
                { value: '', label: 'All clients' },
                ...(result.data.clients ?? []).map((id) => ({ value: id, label: id })),
              ]}
            />
          ) : null}
          <Select
            placeholder="This month"
            widthClass="w-44"
            value={period}
            onChange={(value) => {
              setPage(1);
              setPeriod(value as Period);
            }}
            options={periodOptions}
          />
          <Select
            placeholder="All types"
            widthClass="w-44"
            value={type}
            onChange={(value) => {
              setPage(1);
              setType(value);
            }}
            options={[
              { value: '', label: 'All types' },
              { value: 'stripe_payment', label: 'Stripe payment' },
              { value: 'xero_invoice', label: 'Xero invoice' },
              { value: 'credit', label: 'Credit' },
              { value: 'debit', label: 'Debit' },
            ]}
          />
        </div>
      </div>
      <TableColumns
        widthType="pc"
        columns={[
          { width: 14, heading: 'Date' },
          { width: 14, heading: 'Title' },
          { width: 18, heading: 'Description' },
          { width: 14, heading: 'Client' },
          { width: 10, heading: 'Type' },
          { width: 10, heading: 'Spend' },
          { width: 10, heading: 'Tax' },
          { width: 10, heading: 'Total' },
        ]}
      />
      {result.data.items.length === 0 ? (
        <p className="p-4 text-subtle">No transactions yet.</p>
      ) : (
        <TableRows
          widthType="pc"
          rows={result.data.items.map((entry) => {
            const meta = typeLabels[entry.type];
            const debit = entry.gross < 0;
            const amountClass = debit ? 'text-red-400' : 'text-orange-100';

            return {
              uuid: entry.uuid,
              cells: [
                { width: 14, content: <span className="text-sm text-white">{new Date(entry.createdAt).toLocaleDateString('en-GB')}</span> },
                { width: 14, content: <span className="truncate text-sm text-white" title={entry.title ?? ''}>{entry.title ?? '-'}</span> },
                { width: 18, content: <span className="truncate text-sm text-white" title={entry.description ?? ''}>{entry.description ?? '-'}</span> },
                { width: 14, content: <span className="truncate text-sm text-white">{entry.clientId}</span> },
                { width: 10, content: <Pill size="small" colour={meta.colour} text={meta.label} outline /> },
                { width: 10, content: <span className={`text-sm ${amountClass}`}>{money(entry.net)}</span> },
                { width: 10, content: <span className={`text-sm ${amountClass}`}>{money(entry.vat)}</span> },
                { width: 10, content: <span className={`text-sm font-semibold ${amountClass}`}>{debit ? '-' : '+'}{money(entry.gross)}</span> },
              ],
            };
          })}
        />
      )}
      <TablePagination
        page={result.data.pagination.page}
        perPage={result.data.pagination.perPage}
        total={result.data.pagination.total}
        onPageChange={setPage}
        onPerPageChange={(next) => {
          setPage(1);
          setPerPage(next);
        }}
      />
    </TableContainer>
  );
};
