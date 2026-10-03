import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';

export type SubNavItem = {
  id?: string;
  label: string;
  to?: string;
};

const tabActive =
  'flex items-center border-b-2 border-orange-100 px-3 text-sm font-semibold text-orange-100 transition';

const tabInactive =
  'flex items-center border-b-2 border-transparent px-3 text-sm font-semibold text-subtle transition hover:text-white';

const itemId = (item: SubNavItem): string => item.id ?? item.to ?? item.label;

/** Tab strip with the rule underneath, as on a Blaze issue. */
export function SubNav({
  items,
  onChange,
  value,
}: {
  items: SubNavItem[];
  onChange?: ((id: string) => void) | undefined;
  value?: string | undefined;
}): ReactElement {
  return (
    <div className="shrink-0">
      <div className="flex h-12 items-stretch gap-1 overflow-x-auto px-5">
        {items.map((item) => {
          const id = itemId(item);

          if (item.to && !onChange) {
            return (
              <Link
                key={id}
                to={item.to}
                activeProps={{ className: tabActive }}
                inactiveProps={{ className: tabInactive }}
              >
                {item.label}
              </Link>
            );
          }

          const active = value === id;

          return (
            <button key={id} type="button" className={active ? tabActive : tabInactive} onClick={() => onChange?.(id)}>
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="-mt-px border-b border-grey-700t" aria-hidden="true" />
    </div>
  );
}
