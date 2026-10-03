import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type ReactElement } from 'react';
import { Input } from './Input';
import { Pill } from './Pill';
import { Select } from './Select';
import { TableColumns, TableContainer, TablePagination, TableRows } from './Table';

export type XeroInvoice = {
  description: string | null;
  dueDate: string | null;
  net: number;
  number: string | null;
  status: string;
  tax: number;
  total: number;
  url: string;
  uuid: string;
};

const statusColours: Record<string, string> = {
  due: '#DA892B',
  overdue: '#EF4444',
  paid: '#3EB077',
  upcoming: '#70808E',
  void: '#70808E',
};

const money = (amount: number): string =>
  `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const downloadBlob = (filename: string, blob: Blob): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const downloadCsv = (filename: string, headers: string[], rows: string[][]): void => {
  const escape = (value: string): string => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');

  downloadBlob(filename, new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
};

const downloadPdf = async (filename: string, title: string, headers: string[], rows: string[][]): Promise<void> => {
  const { Document, Page, StyleSheet, Text, View, pdf } = await import('@react-pdf/renderer');
  const styles = StyleSheet.create({
    page: { padding: 28, fontSize: 8, fontFamily: 'Helvetica', color: '#111827' },
    title: { fontSize: 14, marginBottom: 12, fontFamily: 'Helvetica-Bold' },
    row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingVertical: 4 },
    header: { fontFamily: 'Helvetica-Bold', backgroundColor: '#F3F4F6' },
    cell: { flex: 1, paddingRight: 6 },
  });
  const blob = await pdf(
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.row, styles.header]}>
          {headers.map((header) => (
            <Text key={header} style={styles.cell}>
              {header}
            </Text>
          ))}
        </View>
        {rows.map((row, index) => (
          <View key={`${row[0] ?? index}-${index}`} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Text key={`${headers[cellIndex] ?? cellIndex}`} style={styles.cell}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>,
  ).toBlob();

  downloadBlob(filename, blob);
};

const descriptionOf = (invoice: XeroInvoice): string => invoice.description ?? invoice.number ?? invoice.uuid;

export const XeroInvoicesList = ({ invoices }: { invoices: XeroInvoice[] }): ReactElement => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const needle = query.trim().toLowerCase();
  const filtered = invoices.filter((invoice) => {
    const matchesQuery =
      needle === '' ||
      descriptionOf(invoice).toLowerCase().includes(needle) ||
      (invoice.number?.toLowerCase().includes(needle) ?? false);
    const matchesStatus = status === '' || invoice.status === status;

    return matchesQuery && matchesStatus;
  });
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const headers = ['Due date', 'Description', 'State', 'Spend', 'Tax', 'Total'];
  const exportRows = filtered.map((invoice) => [
    invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : '—',
    descriptionOf(invoice),
    invoice.status,
    money(invoice.net),
    money(invoice.tax),
    money(invoice.total),
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
        <Select
          placeholder="All statuses"
          widthClass="w-40"
          value={status}
          onChange={(value) => {
            setPage(1);
            setStatus(value);
          }}
          options={[
            { value: '', label: 'All statuses' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'due', label: 'Due' },
            { value: 'overdue', label: 'Overdue' },
            { value: 'paid', label: 'Paid' },
          ]}
        />
      </div>
      <TableColumns
        widthType="pc"
        columns={[
          { width: 14, heading: 'Due date' },
          { width: 30, heading: 'Description' },
          { width: 12, heading: 'State' },
          { width: 12, heading: 'Spend' },
          { width: 12, heading: 'Tax' },
          { width: 12, heading: 'Total' },
          { width: 8 },
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
              { width: 14, content: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : '—' },
              { width: 30, content: descriptionOf(invoice) },
              {
                width: 12,
                content: (
                  <Pill
                    size="small"
                    colour={statusColours[invoice.status] ?? '#70808E'}
                    text={invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    outline
                  />
                ),
              },
              { width: 12, content: money(invoice.net) },
              { width: 12, content: money(invoice.tax) },
              { width: 12, content: money(invoice.total) },
              {
                width: 8,
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
