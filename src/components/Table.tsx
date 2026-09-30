import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { IconButton } from './IconButton';
import { Select } from './Select';

type Columns = Array<{
  heading?: string;
  className?: string;
  width: number;
}>;

type Rows = Array<{
  uuid: string;
  cells: Array<{
    content: ReactNode;
    width: number;
    wrapperClassname?: string;
  }>;
}>;

type WidthTypes = 'fixed' | 'pc';

const getStyles = (widthType: WidthTypes, width: number): CSSProperties => {
  if (widthType === 'pc')
    return {
      width: `${width}%`,
      flexGrow: 1,
      minWidth: 0,
    };
  return {
    width: `${width}px`,
    minWidth: `${width}px`,
    maxWidth: `${width}px`,
  };
};

export const TableColumns = ({
  columns,
  widthType,
}: {
  widthType: WidthTypes;
  columns: Columns;
}): ReactElement => (
  <div className="flex shrink-0 border-b border-grey-700t px-2">
    {columns.map((c, i) => (
      <div
        key={`${c.heading}-${i}`}
        style={getStyles(widthType, c.width)}
        className={`flex min-w-0 items-center overflow-hidden px-3 py-4 text-xs font-bold uppercase text-grey-500 ${c.className ?? ''}`}
      >
        <span className="truncate">{c.heading}</span>
      </div>
    ))}
  </div>
);

export const TableRows = ({
  rows,
  widthType,
}: {
  widthType: WidthTypes;
  rows: Rows;
}) => (
  <div className="flex min-h-0 flex-col overflow-hidden grow">
    <div className="min-h-0 overflow-x-hidden overflow-y-auto grow">
      {rows.length ? (
        rows.map(
          (r) =>
            r.uuid && (
              <div
                key={r.uuid}
                className="flex w-full min-w-0 items-center border-b border-grey-700t last:border-b-0 transition hover:bg-secondary/50"
              >
                {r.cells.map((c, i) => (
                  <div
                    key={i}
                    style={getStyles(widthType, c.width)}
                    className={`flex min-w-0 items-center overflow-hidden px-5 py-3 text-sm ${
                      c.wrapperClassname ?? ''
                    }`}
                  >
                    {typeof c.content === 'string' ? (
                      <span className="min-w-0 truncate">{c.content}</span>
                    ) : (
                      <div
                        className={`flex min-w-0 w-full items-center overflow-hidden ${
                          c.wrapperClassname ?? ''
                        }`}
                      >
                        {c.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ),
        )
      ) : (
        <div className="text-center my-4">
          <span className="text-subtle text-sm">No data found</span>
        </div>
      )}
    </div>
  </div>
);

/** Scrollable body for custom table content (cards, etc.) inside {@link TableContainer}. */
export const TableBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement => (
  <div
    className={classNames(
      'flex min-h-0 flex-1 flex-col overflow-hidden',
      className,
    )}
  >
    <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
  </div>
);

export const TableContainer = ({
  title,
  titleAddon,
  toolbar,
  className,
  flush,
  headerBorder = true,
  children,
}: {
  title?: string;
  /** Rendered immediately after the title, e.g. a filter next to “Sessions”. */
  titleAddon?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
  /** Edge-to-edge table: no inset card border or radius. */
  flush?: boolean;
  /** Divider under the title row. Off for card lists (e.g. Actions). */
  headerBorder?: boolean | undefined;
  children: ReactNode;
}): ReactElement => (
  <div
    className={classNames(
      'overflow-hidden flex flex-col min-h-0',
      flush ? null : 'border border-grey-700t rounded-[2px]',
      className,
    )}
  >
    {(title ? true : toolbar != null || titleAddon != null) && (
      <div
        className={classNames('flex items-center gap-4 p-5', {
          'border-b border-grey-700t': headerBorder,
        })}
      >
        {title ? (
          <div className="flex min-w-0 items-center">
            <h2 className="mr-5 truncate font-grotesque text-[24px]/[28px] font-semibold text-white">
              {title}
            </h2>
            {titleAddon}
          </div>
        ) : (
          titleAddon
        )}
        {toolbar != null && (
          <div className="flex flex-grow shrink-0 flex-wrap items-center justify-end gap-3">
            {toolbar}
          </div>
        )}
      </div>
    )}
    {children}
  </div>
);

export const TablePagination = ({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}): ReactElement => {
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = total === 0 ? 0 : Math.min(page * perPage, total);

  return (
    <nav aria-label="Table pagination" className="flex shrink-0 items-center justify-between gap-3 border-t border-grey-700t px-4 py-3 text-sm text-low">
      <div className="flex items-center gap-2">
        <span aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {from}-{to} of {total}
        </span>
        <label htmlFor="table-rows-per-page">Rows per page</label>
        <Select
          size="small"
          widthClass="w-20"
          name="table-rows-per-page"
          value={String(perPage)}
          onChange={(v) => onPerPageChange(Number(v))}
          options={[10, 15, 25, 50].map((n) => ({
            value: String(n),
            label: String(n),
          }))}
        />
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          Icon={ChevronLeftIcon}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          type="tertiary"
          size="small"
          tooltip="Previous page"
        />
        <span aria-current="page" className="text-white">
          {page}
        </span>
        <span>Of {lastPage}</span>
        <IconButton
          Icon={ChevronRightIcon}
          onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          disabled={page >= lastPage}
          type="tertiary"
          size="small"
          tooltip="Next page"
        />
      </div>
    </nav>
  );
};
