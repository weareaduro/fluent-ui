import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { useState, type ReactElement, type ReactNode } from 'react';
import { AppHeader, type AppHeaderButton, type AppHeaderCrumb } from './AppHeader';
import { AduroEmblem } from './AduroEmblem';
import { OrganisationAvatar } from './OrganisationAvatar';
import { PersonAvatar } from './PersonAvatar';
import { sidebarLabelClassName } from './ProductLockup';

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

const linkClassName =
  'group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-[15px] font-semibold leading-5 text-low-priority outline-none transition hover:bg-white/5 hover:text-white active:shadow-focused-dark data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100';

const menuItemClassName =
  'flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer';

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
      <PersonAvatar email={email} name={name} />
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
        <OrganisationAvatar name={label} {...(current?.website ? { website: current.website } : {})} />
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
              <OrganisationAvatar name={option.label} {...(option.website ? { website: option.website } : {})} />
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
  organisations,
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
  organisations?: {
    onChange: (value: string) => void;
    options: AppOrganisation[];
    value: string;
  };
}): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary text-white">
      <aside
        data-collapsed={collapsed}
        className="flex h-full shrink-0 flex-col border-r border-line bg-primary transition-all duration-150 data-[collapsed=false]:w-60 data-[collapsed=true]:w-[65px]"
      >
        <div
          className="mb-1 flex shrink-0 flex-col items-center justify-center px-4 data-[collapsed=false]:pb-3 data-[collapsed=false]:pt-4 data-[collapsed=true]:h-14"
          data-collapsed={collapsed}
        >
          <Link to="/" aria-label="Home" className="inline-flex items-center">
            <AduroEmblem className="h-7 w-auto" />
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
                <span className={`px-2.5 pb-1 pt-2 ${sidebarLabelClassName}`}>
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
  button,
  crumb,
  title,
}: {
  button?: AppHeaderButton | undefined;
  crumb?: AppHeaderCrumb | undefined;
  title: string;
}): ReactElement => <AppHeader button={button} crumb={crumb} title={title} />;
