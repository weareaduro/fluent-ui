import { type ReactElement } from 'react';
import { Modal, ModalFooter } from './Modal';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  loading,
}: ConfirmDialogProps): ReactElement {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      panelClassName="w-full max-w-md"
      footer={
        <ModalFooter
          onCancel={onClose}
          primaryLabel={confirmLabel}
          onPrimary={onConfirm}
          primaryLoading={loading}
        />
      }
    >
      <p className="text-sm text-low">{message}</p>
    </Modal>
  );
}
