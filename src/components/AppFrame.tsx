import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import type { ReactElement, ReactNode } from 'react';
import { ProductLockup } from './ProductLockup';

const AduroMark = (): ReactElement => (
  <svg width="33" height="29" viewBox="0 0 33 29" fill="none" aria-hidden="true" className="h-5 w-auto">
    <path d="M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z" fill="white" />
    <path d="M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z" fill="white" />
    <path d="M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z" fill="white" />
  </svg>
);

export type AppNavItem = {
  label: string;
  to: string;
};

export type AppOrganisation = {
  label: string;
  value: string;
};

const linkClassName =
  'group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-sm font-semibold text-subtle outline-none transition hover:bg-white/5 hover:text-white data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100';

const menuItemClassName =
  'flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer';

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'A';

const AccountMenu = ({
  email,
  name,
  onLogout,
  settingsTo,
}: {
  email?: string | undefined;
  name: string;
  onLogout: () => void;
  settingsTo: string;
}): ReactElement => (
  <Menu>
    <MenuButton
      aria-label="Account menu"
      className="group flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-left outline-none transition hover:bg-white/5"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
        {initials(name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">{name}</span>
        {email ? <span className="block truncate text-xs text-subtle/70">{email}</span> : null}
      </span>
      <ChevronDownIcon className="size-4 shrink-0 text-subtle/70 group-hover:text-white" />
    </MenuButton>
    <MenuItems
      portal
      anchor={{ to: 'top start', gap: 6 }}
      className="z-50 flex min-w-60 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none"
    >
      <div className="flex flex-col border-b border-line px-3 py-3">
        <span className="truncate text-sm font-semibold text-white">{name}</span>
        {email ? <span className="truncate text-xs text-subtle">{email}</span> : null}
      </div>
      <div className="p-1.5">
        <MenuItem>
          <Link to={settingsTo} className={menuItemClassName}>
            <Cog6ToothIcon className="size-4 shrink-0 text-subtle" />
            <span>Settings</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <button type="button" onClick={onLogout} className={menuItemClassName}>
            <ArrowLeftStartOnRectangleIcon className="size-4 shrink-0 text-subtle" />
            <span>Logout</span>
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
);

const OrganisationMenu = ({
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void;
  options: AppOrganisation[];
  value: string;
}): ReactElement => {
  const current = options.find((option) => option.value === value) ?? options[0];
  const label = current?.label ?? 'Organisation';

  return (
    <Menu>
      <MenuButton
        aria-label="Switch organisation"
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] bg-secondary px-2 py-2 text-left outline-none transition hover:bg-white/10"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-xs font-bold text-white">
          {initials(label)}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{label}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-subtle" />
      </MenuButton>
      <MenuItems
        portal
        anchor={{ to: 'bottom start', gap: 6 }}
        className="z-50 flex min-w-56 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none"
      >
        {options.map((option) => (
          <MenuItem key={option.value}>
            <button
              type="button"
              onClick={() => onChange(option.value)}
              className={menuItemClassName}
            >
              {option.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export const AppFrame = ({
  account,
  children,
  footerItems = [],
  items,
  logoSrc,
  organisations,
  productName,
}: {
  account?: {
    email?: string | undefined;
    name: string;
    onLogout: () => void;
    settingsTo?: string | undefined;
  };
  children: ReactNode;
  footerItems?: AppNavItem[] | undefined;
  items: AppNavItem[];
  logoSrc?: string | undefined;
  organisations?: {
    onChange: (value: string) => void;
    options: AppOrganisation[];
    value: string;
  };
  productName: string;
}): ReactElement => (
  <div className="flex h-screen w-full overflow-hidden bg-primary text-white">
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-line bg-primary">
      <div className="flex shrink-0 flex-col items-center justify-center px-4 pb-3 pt-4">
        <Link to="/" aria-label={`${productName} by Aduro`} className="inline-flex flex-col items-center gap-1.5">
          {logoSrc ? <img src={logoSrc} alt="" className="h-5 w-auto" /> : <AduroMark />}
          <ProductLockup productName={productName} />
        </Link>
      </div>
      {organisations && organisations.options.length > 0 ? (
        <div className="px-3 pb-3">
          <OrganisationMenu
            onChange={organisations.onChange}
            options={organisations.options}
            value={organisations.value}
          />
        </div>
      ) : null}
      <nav aria-label="Main navigation" className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className={linkClassName}>
            {item.label}
          </Link>
        ))}
        {footerItems.length > 0 ? (
          <div className="mt-auto flex flex-col gap-1 border-t border-line pt-3">
            {footerItems.map((item) => (
              <Link key={item.to} to={item.to} className={linkClassName}>
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
      {account ? (
        <div className="border-t border-line px-3 py-2">
          <AccountMenu
            email={account.email}
            name={account.name}
            onLogout={account.onLogout}
            settingsTo={account.settingsTo ?? '/settings'}
          />
        </div>
      ) : null}
    </aside>
    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
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
