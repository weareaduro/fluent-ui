import { useState, type ReactElement, type ReactNode } from 'react';
import { Button } from './Button';

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
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const visible = rows.slice(current * pageSize, current * pageSize + pageSize);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[2px] border border-grey-700t">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-white/5 text-grey-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2 font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-subtle" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={rowKey(row)} className="border-t border-grey-700t">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-white">
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-1 text-sm text-subtle">
        <span>
          Page {current + 1} of {pageCount}
        </span>
        <div className="flex gap-2">
          <Button
            button={{
              disabled: current === 0,
              onClick: () => setPage(current - 1),
              size: 'small',
              text: 'Previous',
              type: 'secondary',
            }}
          />
          <Button
            button={{
              disabled: current >= pageCount - 1,
              onClick: () => setPage(current + 1),
              size: 'small',
              text: 'Next',
              type: 'secondary',
            }}
          />
        </div>
      </div>
    </div>
  );
}
