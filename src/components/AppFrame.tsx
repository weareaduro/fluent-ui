import { Link } from '@tanstack/react-router';
import type { ReactElement, ReactNode } from 'react';

export type AppNavItem = {
  label: string;
  to: string;
};

const navClassName =
  'rounded-[2px] px-2.5 py-2 text-sm font-semibold text-subtle outline-none transition hover:bg-white/5 hover:text-white data-[status=active]:bg-white/10 data-[status=active]:text-white';

export const AppFrame = ({
  children,
  footer,
  footerItems = [],
  items,
  brand,
  topbar,
}: {
  brand: ReactNode;
  children: ReactNode;
  footer?: ReactNode | undefined;
  footerItems?: AppNavItem[] | undefined;
  items: AppNavItem[];
  topbar?: ReactNode | undefined;
}): ReactElement => (
  <div className="flex h-screen w-full overflow-hidden bg-primary text-white">
    <aside className="flex w-60 shrink-0 flex-col border-r border-grey-700t bg-secondary">
      <div className="px-4 py-5">{brand}</div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className={navClassName}>
            {item.label}
          </Link>
        ))}
      </nav>
      {footerItems.length > 0 ? (
        <nav className="flex flex-col gap-1 px-3 pb-2">
          {footerItems.map((item) => (
            <Link key={item.to} to={item.to} className={navClassName}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
      {footer ? <div className="p-3">{footer}</div> : null}
    </aside>
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {topbar}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
);

export const PageHeader = ({
  actions,
  title,
}: {
  actions?: ReactNode;
  title: string;
}): ReactElement => (
  <div className="flex items-center justify-between gap-4 border-b border-grey-700t px-6 py-4">
    <h1 className="font-grotesque text-2xl font-semibold text-white">{title}</h1>
    {actions}
  </div>
);
