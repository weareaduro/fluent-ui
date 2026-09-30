import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { useState, type ReactElement, type ReactNode } from 'react';
import { ProductLockup } from './ProductLockup';

const AduroMark = ({ className = 'h-5 w-auto' }: { className?: string }): ReactElement => (
  <svg width="33" height="29" viewBox="0 0 33 29" fill="none" aria-hidden="true" className={className}>
    <path d="M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z" fill="white" />
    <path d="M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z" fill="white" />
    <path d="M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z" fill="white" />
  </svg>
);

export type AppNavItem = {
  Icon?: HeroIconType | undefined;
  label: string;
  to: string;
};

const SidebarPanelIcon = ({ className = '' }: { className?: string }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 5.25h16.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Zm5.25 0v13.5"
    />
  </svg>
);

export type AppOrganisation = {
  label: string;
  value: string;
  website?: string;
};

const organisationFaviconUrl = (website: string | undefined): string | null => {
  const trimmed = website?.trim();

  if (!trimmed) return null;

  try {
    const hostname = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`).hostname;

    if (hostname === '') return null;

    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return null;
  }
};

const OrganisationAvatar = ({
  label,
  website,
}: {
  label: string;
  website?: string;
}): ReactElement => {
  const src = organisationFaviconUrl(website);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        className="size-7 shrink-0 rounded-full border border-line object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
      {initials(label)}
    </span>
  );
};

const linkClassName =
  'group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-[15px] font-semibold leading-5 text-low-priority outline-none transition hover:bg-white/5 hover:text-white active:shadow-focused-dark data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100';

const menuItemClassName =
  'flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer';

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'A';

const NavLink = ({
  collapsed,
  item,
}: {
  collapsed: boolean;
  item: AppNavItem;
}): ReactElement => (
  <Link
    to={item.to}
    aria-label={collapsed ? item.label : undefined}
    title={collapsed ? item.label : undefined}
    className={`${linkClassName} data-[collapsed=true]:justify-center`}
    data-collapsed={collapsed}
  >
    {item.Icon ? <item.Icon className="size-5 shrink-0" /> : null}
    {collapsed ? null : <span className="truncate">{item.label}</span>}
  </Link>
);

const AccountMenu = ({
  collapsed,
  email,
  name,
  onLogout,
  role,
  settingsTo,
}: {
  collapsed: boolean;
  email?: string | undefined;
  name: string;
  onLogout: () => void;
  role?: string | undefined;
  settingsTo: string;
}): ReactElement => (
  <Menu>
    <MenuButton
      aria-label="Account menu"
      className="group flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-left outline-none transition hover:bg-white/5 data-[collapsed=true]:justify-center"
      data-collapsed={collapsed}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
        {initials(name)}
      </span>
      {collapsed ? null : (
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">{name}</span>
          {role ? <span className="block truncate text-xs text-subtle/70">{role}</span> : null}
          {!role && email ? <span className="block truncate text-xs text-subtle/70">{email}</span> : null}
        </span>
      )}
      {collapsed ? null : (
        <ChevronDownIcon className="size-4 shrink-0 text-subtle/70 group-hover:text-white" />
      )}
    </MenuButton>
    <MenuItems
      portal
      anchor={{ to: 'top start', gap: 6 }}
      className="z-50 flex min-w-60 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none"
    >
      <div className="flex flex-col border-b border-line px-3 py-3">
        <span className="truncate text-sm font-semibold text-white">{name}</span>
        {role ? <span className="truncate text-xs text-subtle">{role}</span> : null}
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
        <OrganisationAvatar label={label} {...(current?.website ? { website: current.website } : {})} />
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
              <OrganisationAvatar label={option.label} {...(option.website ? { website: option.website } : {})} />
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
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
    role?: string | undefined;
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
}): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary text-white">
      <aside
        data-collapsed={collapsed}
        className="flex h-full shrink-0 flex-col border-r border-line bg-primary transition-all duration-150 data-[collapsed=false]:w-60 data-[collapsed=true]:w-[65px]"
      >
        <div
          className="flex shrink-0 flex-col items-center justify-center px-4 data-[collapsed=false]:pb-3 data-[collapsed=false]:pt-4 data-[collapsed=true]:h-14"
          data-collapsed={collapsed}
        >
          <Link
            to="/"
            aria-label={`${productName} by Aduro`}
            className="inline-flex flex-col items-center gap-1.5"
          >
            {logoSrc ? (
              <img src={logoSrc} alt="" className="h-5 w-auto" />
            ) : (
              <span className="inline-flex items-center gap-2">
                <AduroMark />
                {collapsed ? null : (
                  <span className="font-grotesque text-[22px] font-semibold leading-none tracking-tight text-white">
                    {productName}
                  </span>
                )}
              </span>
            )}
            {collapsed ? null : logoSrc ? (
              <ProductLockup productName={productName} />
            ) : (
              <span className="font-grotesque text-sm font-semibold leading-6 text-grey-500">
                by Aduro
              </span>
            )}
          </Link>
        </div>
        {organisations && organisations.options.length > 0 && !collapsed ? (
          <div className="px-3 pb-3">
            <OrganisationMenu
              onChange={organisations.onChange}
              options={organisations.options}
              value={organisations.value}
            />
          </div>
        ) : null}
        <nav
          aria-label="Main navigation"
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3"
        >
          {items.map((item) => (
            <NavLink key={item.to} collapsed={collapsed} item={item} />
          ))}
          {footerItems.length > 0 ? (
            <div className="mt-auto flex flex-col gap-1">
              {collapsed ? null : (
                <span className="px-2.5 pb-1 pt-2 font-grotesque text-sm font-semibold leading-6 text-grey-500">
                  Administration
                </span>
              )}
              {footerItems.map((item) => (
                <NavLink key={item.to} collapsed={collapsed} item={item} />
              ))}
            </div>
          ) : null}
        </nav>
        <div className="flex flex-col border-t border-line">
          {account ? (
            <div className="px-3 py-2">
              <AccountMenu
                collapsed={collapsed}
                email={account.email}
                name={account.name}
                onLogout={account.onLogout}
                role={account.role}
                settingsTo={account.settingsTo ?? '/settings'}
              />
            </div>
          ) : null}
          <div
            className="flex border-t border-line px-3 py-2 data-[collapsed=true]:justify-center"
            data-collapsed={collapsed}
          >
            <button
              type="button"
              onClick={() => setCollapsed((current) => !current)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              className="group flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-subtle outline-none transition hover:bg-white/5 hover:text-white"
            >
              <SidebarPanelIcon className="size-5 shrink-0" />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
};

export const PageHeader = ({
  actions,
  title,
}: {
  actions?: ReactNode;
  title: string;
}): ReactElement => (
  <div className="flex items-center justify-between gap-4 border-b border-grey-700t px-6 py-4">
    <h1 className="truncate font-grotesque text-[30px] font-semibold leading-9 text-white">{title}</h1>
    {actions}
  </div>
);
