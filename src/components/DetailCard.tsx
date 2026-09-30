import {
  type ReactElement,
  type ReactNode,
  useId,
  useSyncExternalStore,
} from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Pill } from './Pill';
import { Button } from './Button';
import { IconButton } from './IconButton';
import {
  getDetailCardsCollapsed,
  setDetailCardsCollapsed,
  subscribeDetailCardsCollapsed,
} from './detailCardCollapseStore';

interface DetailCardProps {
  title: string;
  subtitle?: string | undefined;
  status?: { text: string; colour: string } | undefined;
  actions?: ReactNode | undefined;
  onEdit?: (() => void) | undefined;
  onDelete?: (() => void) | undefined;
  children: ReactNode;
}

export function DetailCard({
  title,
  subtitle,
  status,
  actions,
  onEdit,
  onDelete,
  children,
}: DetailCardProps): ReactElement {
  const collapseTooltipId = useId();
  const collapsed = useSyncExternalStore(
    subscribeDetailCardsCollapsed,
    getDetailCardsCollapsed,
    () => false,
  );

  return (
    <div className="relative border border-grey-700t rounded-[2px] bg-secondary p-5 pb-12">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-grotesque text-4xl lg:text-5xl font-bold text-white truncate">
            {title}
          </h2>
          {status && (
            <Pill
              text={status.text}
              colour={status.colour}
              size="small"
              outline
            />
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          {onEdit && (
            <Button
              button={{
                text: 'Edit',
                type: 'secondary',
                size: 'large',
                shrink: true,
                onClick: onEdit,
              }}
            />
          )}
          {onDelete && (
            <IconButton
              Icon={TrashIcon}
              onClick={onDelete}
              tooltip="Delete"
              type="delete"
              size="small"
            />
          )}
        </div>
      </div>
      {!collapsed && subtitle && (
        <p className="text-sm text-low mb-4">{subtitle}</p>
      )}
      {!collapsed && children}
      <IconButton
        Icon={collapsed ? ChevronDownIcon : ChevronUpIcon}
        type="basic"
        size="small"
        tooltip={
          collapsed
            ? 'Expand detail cards (all pages)'
            : 'Collapse detail cards (all pages)'
        }
        tooltipId={collapseTooltipId}
        onClick={() => setDetailCardsCollapsed(!collapsed)}
        className="!absolute bottom-3 right-5 z-10 border border-grey/30 hover:brightness-125"
      />
    </div>
  );
}

export function DetailGrid({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">{children}</div>
  );
}

export function DetailRow({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}): ReactElement {
  return (
    <div className="flex flex-col">
      <span className="text-low">{label}</span>
      <span className="text-white font-semibold">{value ?? '-'}</span>
    </div>
  );
}
