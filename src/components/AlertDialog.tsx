import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Button } from './Button';
import { IconButton } from './IconButton';

const overlayClass =
  'fixed inset-0 z-40 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in data-[enter]:duration-200 data-[leave]:duration-150';

/** Confirmation without a modal header or cancel action. Close stays in the corner. */
export function AlertDialog({
  actionLabel,
  icon: Icon = CheckIcon,
  message,
  onAction,
  onClose,
  open,
  title,
}: {
  actionLabel: string;
  icon?: HeroIconType;
  message: string;
  onAction: () => void;
  onClose: () => void;
  open: boolean;
  title: string;
}): ReactElement {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className={overlayClass} aria-hidden="true" onClick={onClose}>
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
      <div className="fixed z-50 inset-0 flex w-full items-center justify-center p-4 pointer-events-none">
        <DialogPanel
          className={classNames(
            'pointer-events-auto w-full max-w-md rounded-[2px] border border-grey-700t bg-tertiary p-5 shadow-xl',
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[2px] bg-orange-100/20 text-orange-100">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <DialogTitle className="truncate text-base font-semibold text-white">{title}</DialogTitle>
            </div>
            <IconButton onClick={onClose} Icon={XMarkIcon} aria-label="Close" type="subtle" size="small" />
          </div>
          <p className="mt-3 text-sm text-subtle">{message}</p>
          <div className="mt-5 flex justify-end">
            <Button
              button={{
                onClick: onAction,
                shrink: true,
                size: 'control',
                text: actionLabel,
                type: 'primary',
              }}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
