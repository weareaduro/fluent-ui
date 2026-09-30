import { useState, type ReactElement, type ReactNode } from 'react';
import { TableColumns, TableContainer, TablePagination, TableRows } from './Table';

export type DataColumn<Row> = {
  cell: (row: Row) => ReactNode;
  header: string;
  key: string;
};

export function DataTable<Row>({
  columns,
  empty = 'Nothing here yet.',
  pageSize = 20,
  rows,
  rowKey,
}: {
  columns: Array<DataColumn<Row>>;
  empty?: string;
  pageSize?: number;
  rowKey: (row: Row) => string;
  rows: Row[];
}): ReactElement {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(pageSize);
  const lastPage = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(page, lastPage);
  const visible = rows.slice((current - 1) * perPage, current * perPage);
  const width = columns.length === 0 ? 100 : Math.floor(100 / columns.length);

  return (
    <TableContainer flush className="min-h-[320px]">
      <TableColumns
        widthType="pc"
        columns={columns.map((column) => ({ heading: column.header, width }))}
      />
      {visible.length === 0 ? (
        <p className="px-5 py-6 text-sm text-subtle">{empty}</p>
      ) : (
        <TableRows
          widthType="pc"
          rows={visible.map((row) => ({
            uuid: rowKey(row),
            cells: columns.map((column) => ({
              content: column.cell(row),
              width,
            })),
          }))}
        />
      )}
      <TablePagination
        page={current}
        perPage={perPage}
        total={rows.length}
        onPageChange={setPage}
        onPerPageChange={(next) => {
          setPerPage(next);
          setPage(1);
        }}
      />
    </TableContainer>
  );
}
