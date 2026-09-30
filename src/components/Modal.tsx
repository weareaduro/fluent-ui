import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { type ReactElement, type ReactNode } from 'react';
import { FieldVariantContext } from './FieldVariantContext';
import { IconButton } from './IconButton';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Footer actions: pass e.g. Cancel + Primary button(s) */
  footer?: ReactNode;
  /** Optional class for the panel (e.g. max width) */
  panelClassName?: string;
  /** Optional id for the modal title element, used for aria-labelledby */
  titleId?: string;
}

const overlayClass =
  'fixed inset-0 z-40 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in data-[enter]:duration-200 data-[leave]:duration-150';

const panelBaseClass =
  'bg-tertiary border border-grey-700t rounded-[2px] shadow-xl flex flex-col max-h-[90vh] overflow-hidden';

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  panelClassName,
  titleId,
}: ModalProps): ReactElement {
  const resolvedTitleId = titleId ?? `modal-title-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
      aria-labelledby={resolvedTitleId}
    >
      <div className={overlayClass} aria-hidden="true" onClick={onClose}>
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
      <div className="fixed z-50 inset-0 flex w-full items-center justify-center p-4 pointer-events-none">
        <DialogPanel
          aria-modal="true"
          role="dialog"
          className={classNames(
            panelBaseClass,
            'pointer-events-auto',
            panelClassName ?? 'w-full max-w-lg',
          )}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-grey-700t px-5 py-4">
            <DialogTitle
              id={resolvedTitleId}
              className="font-grotesque text-2xl font-bold text-white"
            >
              {title}
            </DialogTitle>
            <IconButton
              onClick={onClose}
              Icon={XMarkIcon}
              aria-label="Close modal"
              type="subtle"
            />
          </div>
          <FieldVariantContext.Provider value="outlined">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4">
              {children}
            </div>
          </FieldVariantContext.Provider>
          {footer != null && (
            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-grey-700t px-5 py-4">
              {footer}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

/** Helper for typical modal footer: Cancel + Primary button */
export function ModalFooter({
  onCancel,
  cancelLabel = 'Cancel',
  primaryLabel,
  onPrimary,
  primaryDisabled,
  primaryLoading,
}: {
  onCancel: () => void;
  cancelLabel?: string | undefined;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean | undefined;
  primaryLoading?: boolean | undefined;
}): ReactElement {
  return (
    <>
      <Button
        button={{
          text: cancelLabel,
          type: 'ghost',
          size: 'medium',
          shrink: true,
          onClick: onCancel,
        }}
      />
      <Button
        button={{
          text: primaryLabel,
          type: 'primary',
          size: 'medium',
          shrink: true,
          onClick: onPrimary,
          disabled: primaryDisabled,
          loading: primaryLoading,
        }}
      />
    </>
  );
}
