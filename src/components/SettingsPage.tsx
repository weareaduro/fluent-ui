import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type ReactElement } from 'react';
import { displayRole, roleLabel } from '../signet/claims';
import { useDirectory, useFluentConfig, useSignetMutation } from '../signet/provider';
import { PageHeader } from './AppFrame';
import { ConfirmDialog } from './ConfirmDialog';
import { DataTable } from './DataTable';
import { useNotificationGroups } from './Notifications';
import { Pill } from './Pill';

const sideNavItemClassName = (active: boolean): string =>
  ['w-full rounded-[2px] px-3 py-2 text-left text-sm font-semibold outline-none transition', active ? 'bg-orange-100/10 text-orange-100' : 'text-low hover:bg-white/5 hover:text-white'].join(' ');

const serviceLabel = (provider: string): string => {
  const names: Record<string, string> = {
    github: 'GitHub',
    gitlab: 'GitLab',
    google: 'Google',
    microsoft: 'Microsoft',
    slack: 'Slack',
  };

  return names[provider] ?? roleLabel(provider);
};

const menuItemClassName =
  'flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white';

type Section = 'account' | 'connected-services' | 'notifications';

const sectionFromHash = (hasNotifications: boolean): Section => {
  const hash = window.location.hash.replace('#', '');

  if (hash === 'connected-services') return 'connected-services';

  if (hash === 'notifications' && hasNotifications) return 'notifications';

  return 'account';
};

export const SettingsPage = (): ReactElement => {
  const { endpoint } = useFluentConfig();
  const { currentOrganisation, user } = useDirectory();
  const groups = useNotificationGroups();
  const hasNotifications = (groups?.length ?? 0) > 0;
  const [section, setSection] = useState<Section>(() => sectionFromHash(hasNotifications));
  const [providers, setProviders] = useState<string[]>([]);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const given = user.given_name?.trim() ?? '';
  const family = user.family_name?.trim() ?? '';
  const name = [given, family].filter((part) => part !== '').join(' ') || user.name?.trim() || user.email;

  useEffect(() => {
    void fetch(`${endpoint.replace(/\/$/, '')}/oauth/providers`)
      .then(async (response) => {
        if (!response.ok) return;

        const body = (await response.json()) as { providers?: string[] };

        setProviders((body.providers ?? []).filter((provider) => provider !== 'credentials'));
      })
      .catch(() => undefined);
  }, [endpoint]);

  const connected = providers.filter((provider) => user.connections.some((connection) => connection.method === provider));

  const choose = (next: Section) => {
    setSection(next);
    window.history.replaceState(null, '', next === 'account' ? '/settings' : `/settings#${next}`);
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <PageHeader title="Settings" />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="flex w-52 shrink-0 flex-col gap-0.5 self-stretch border-r border-grey-700t px-3 py-4" aria-label="Settings sections">
          <button type="button" className={sideNavItemClassName(section === 'account')} onClick={() => choose('account')}>
            Account
          </button>
          {hasNotifications ? (
            <button type="button" className={sideNavItemClassName(section === 'notifications')} onClick={() => choose('notifications')}>
              Notifications
            </button>
          ) : null}
          <button type="button" className={sideNavItemClassName(section === 'connected-services')} onClick={() => choose('connected-services')}>
            Connected Services
          </button>
        </aside>
        <div className={section === 'connected-services' ? 'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden' : 'flex min-h-0 flex-1 flex-col overflow-y-auto p-5'}>
          {section === 'account' ? (
            <div className="flex max-w-3xl flex-col gap-8">
              <section>
                <h2 className="mb-4 font-grotesque text-xl font-semibold">Profile</h2>
                <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <dt className="mb-1 text-sm text-subtle">Role</dt>
                    <dd className="font-semibold text-orange-100">{displayRole(currentOrganisation?.role, user.role) || '—'}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-subtle">Name</dt>
                    <dd className="text-low">{name || '—'}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-subtle">Email</dt>
                    <dd className="text-low">{user.email || '—'}</dd>
                  </div>
                </dl>
              </section>
            </div>
          ) : null}
          {section === 'notifications' && groups ? (
            <div className="flex max-w-3xl flex-col gap-8">
              {groups.map((group) => (
                <section key={group.id}>
                  <h2 className="mb-4 font-grotesque text-xl font-semibold">{group.title}</h2>
                  <ul className="flex flex-col gap-3">
                    {group.options.map((option) => (
                      <li key={option.id} className="flex items-center justify-between gap-4">
                        <span>
                          <span className="block text-sm text-white">{option.label}</span>
                          {option.description ? <span className="block text-xs text-subtle">{option.description}</span> : null}
                        </span>
                        <button type="button" aria-pressed={option.enabled} className="text-sm font-semibold text-orange-100" onClick={() => option.onChange(!option.enabled)}>
                          {option.enabled ? 'On' : 'Off'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : null}
          {section === 'connected-services' ? (
            <DataTable
              empty="No connected services."
              rowKey={(provider) => provider}
              rows={connected}
              columns={[
                { cell: (provider) => <span className="font-semibold text-white">{serviceLabel(provider)}</span>, header: 'Service', key: 'service' },
                {
                  cell: (provider) => {
                    const connected = user.connections.some((connection) => connection.method === provider);

                    return connected ? <Pill size="small" colour="#3EB077" text="Connected" outline /> : <span className="text-sm text-low">Not connected</span>;
                  },
                  header: 'Status',
                  key: 'status',
                },
                {
                  cell: (provider) => {
                    const connected = user.connections.some((connection) => connection.method === provider);
                    const canChange = provider === 'github' || provider === 'google';

                    if (!canChange) return null;

                    const href = `${endpoint.replace(/\/$/, '')}/connect/${provider}?return_to=${encodeURIComponent(window.location.href)}`;

                    return (
                      <Menu>
                        <MenuButton aria-label={`${provider} actions`} className="rounded-[2px] p-2 text-subtle outline-none transition hover:bg-white/5 hover:text-white">
                          <EllipsisVerticalIcon className="size-5" />
                        </MenuButton>
                        <MenuItems portal anchor={{ to: 'bottom end', gap: 6 }} className="z-50 min-w-44 rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-hidden">
                          <div className="p-1.5">
                            {connected ? (
                              <MenuItem>
                                <button type="button" className={menuItemClassName} onClick={() => setConfirmRemove(provider)}>
                                  Remove
                                </button>
                              </MenuItem>
                            ) : (
                              <MenuItem>
                                <a href={href} className={menuItemClassName}>
                                  Connect
                                </a>
                              </MenuItem>
                            )}
                          </div>
                        </MenuItems>
                      </Menu>
                    );
                  },
                  header: '',
                  key: 'actions',
                },
              ]}
            />
          ) : null}
        </div>
      </div>
      <ConfirmDialog
        confirmLabel="Remove"
        loading={removing}
        message={confirmRemove ? `Remove your ${serviceLabel(confirmRemove)} connection?` : 'Remove this connection?'}
        open={confirmRemove != null}
        title="Remove Connection"
        onClose={() => setConfirmRemove(null)}
        onConfirm={() => {
          if (!confirmRemove) return;

          setRemoving(true);
          void mutate(`/oauth/connections/${confirmRemove}`, { method: 'DELETE' })
            .then(() => {
              setConfirmRemove(null);
              return queryClient.invalidateQueries({ queryKey: ['signet', 'directory'] });
            })
            .catch(() => undefined)
            .finally(() => setRemoving(false));
        }}
      />
    </section>
  );
};
