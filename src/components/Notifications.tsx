import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { BellIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createContext, useContext, type ReactElement, type ReactNode } from 'react';
import { IconButton, getIconButtonStyles } from './IconButton';

export type NotificationOption = {
  description?: string;
  enabled: boolean;
  id: string;
  label: string;
  onChange: (enabled: boolean) => void;
};

export type NotificationGroup = {
  id: string;
  options: NotificationOption[];
  title: string;
};

export type PortalNotification = {
  createdAt: string;
  description: string;
  isViewed: boolean;
  title: string;
  uuid: string;
};

const NotificationsContext = createContext<NotificationGroup[] | null>(null);
const PortalNotificationsContext = createContext<PortalNotification[]>([]);

export const NotificationsProvider = ({
  children,
  groups,
}: {
  children: ReactNode;
  groups: NotificationGroup[];
}): ReactElement => <NotificationsContext.Provider value={groups}>{children}</NotificationsContext.Provider>;

export const useNotificationGroups = (): NotificationGroup[] | null => useContext(NotificationsContext);

export const PortalNotificationsProvider = ({
  children,
  notifications,
}: {
  children: ReactNode;
  notifications: PortalNotification[];
}): ReactElement => <PortalNotificationsContext.Provider value={notifications}>{children}</PortalNotificationsContext.Provider>;

export const usePortalNotifications = (): PortalNotification[] => useContext(PortalNotificationsContext);

const menuPanelClassName = 'z-50 outline-hidden flex flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl';

/** Bell and inbox. The list comes from portal notification context; an empty list is the caught-up state. */
export const NotificationsMenu = (): ReactElement => {
  const notifications = usePortalNotifications();
  const unread = notifications.filter((notification) => !notification.isViewed).length;

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : 'Notifications'}
        {...getIconButtonStyles({ type: 'basic', size: 'small', disabled: false })}
      >
        <BellIcon className="size-5 stroke-subtle" />
        {unread > 0 ? (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white">
            {unread > 99 ? '99+' : unread}
          </span>
        ) : null}
      </PopoverButton>
      <PopoverPanel
        portal
        anchor={{ to: 'bottom end', gap: 8 }}
        transition
        className={`${menuPanelClassName} w-[360px] max-w-[calc(100vw-2rem)] origin-top transition data-closed:scale-95 data-closed:opacity-0`}
      >
        {({ close }) => (
          <>
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <h2 className="font-grotesque text-xl font-bold">Notifications</h2>
              <IconButton onClick={() => close()} size="small" type="subtle" Icon={XMarkIcon} tooltip="Close" />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.uuid} className="border-b border-line px-4 py-3 last:border-b-0">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                      {!notification.isViewed ? (
                        <span className="rounded-full bg-orange-100/15 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-100">New</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-low">{notification.description}</p>
                    <span className="mt-2 block text-xs text-subtle">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center px-6 py-8 text-center">
                  <div className="mb-4 rounded-[2px] bg-orange-100/10 p-4">
                    <CheckIcon className="size-8 text-orange-100" />
                  </div>
                  <h3 className="font-grotesque text-xl font-semibold text-white">No notifications yet</h3>
                  <p className="mt-1 text-sm text-subtle">You&apos;re all caught up.</p>
                </div>
              )}
            </div>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
};
