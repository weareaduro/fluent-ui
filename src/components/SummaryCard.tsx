import type { ReactElement, ReactNode } from 'react';

/** Bordered record header: title, status, actions, and a detail grid. */
export function SummaryCard({
  actions,
  children,
  status,
  title,
}: {
  actions?: ReactNode;
  children?: ReactNode;
  status?: string | undefined;
  title: string;
}): ReactElement {
  return (
    <div className="rounded-[2px] border border-grey-700t bg-secondary p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h2 className="truncate font-grotesque text-[30px] font-semibold leading-9 text-white">{title}</h2>
          {status ? (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-semibold capitalize text-subtle">
              {status}
            </span>
          ) : null}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
