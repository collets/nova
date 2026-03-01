import { useEffect, useRef, type ReactNode } from 'react';

interface AppDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ariaLabelledBy: string;
  dialogClassName?: string;
  panelClassName?: string;
  children: ReactNode;
}

export function AppDialog({
  isOpen,
  onRequestClose,
  ariaLabelledBy,
  dialogClassName,
  panelClassName,
  children,
}: AppDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`app-dialog ${dialogClassName ?? ''}`.trim()}
      aria-labelledby={ariaLabelledBy}
      onClose={onRequestClose}
      onCancel={onRequestClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onRequestClose();
        }
      }}
    >
      <section className={`panel app-dialog-panel ${panelClassName ?? ''}`.trim()}>
        {children}
      </section>
    </dialog>
  );
}
