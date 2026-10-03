import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from '@tanstack/react-router';
import type { ReactElement } from 'react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { NotificationsMenu } from './Notifications';

export type AppHeaderCrumb = {
  segment: string;
  backPath: string;
};

export type AppHeaderButton = {
  icon: HeroIconType;
  label: string;
  onClick: () => void;
};

/** Page header. Title, an optional back crumb, and one optional action. Notifications stay on the right. */
export const AppHeader = ({
  button,
  crumb,
  title,
}: {
  button?: AppHeaderButton | undefined;
  crumb?: AppHeaderCrumb | undefined;
  title: string;
}): ReactElement => {
  const router = useRouter();
  const goBack = () => {
    if (!crumb) return;

    void router.navigate({ to: crumb.backPath });
  };

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-grey-700t bg-primary px-5 py-3">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        {crumb ? (
          <div className="flex min-w-0 items-center gap-5">
            <IconButton
              Icon={ArrowLeftIcon}
              onClick={goBack}
              size="small"
              type="tertiary"
              tooltip="Go back"
              className="border-line hover:bg-white/5"
            />
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
              <button
                type="button"
                className="truncate font-semibold text-subtle transition hover:text-white"
                onClick={goBack}
              >
                {title}
              </button>
              <span className="text-subtle/40" aria-hidden="true">
                /
              </span>
              <h1 className="truncate font-semibold text-subtle/60" aria-current="page">
                {crumb.segment}
              </h1>
            </nav>
          </div>
        ) : (
          <h1 className="min-w-0 truncate font-grotesque text-[30px] font-semibold leading-9 text-white">{title}</h1>
        )}
        {button ? (
          <Button
            button={{
              IconStart: button.icon,
              onClick: button.onClick,
              shrink: true,
              size: 'control',
              text: button.label,
              type: 'primary',
            }}
          />
        ) : null}
      </div>
      <NotificationsMenu />
    </header>
  );
};
