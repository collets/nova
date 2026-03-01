interface DialogCloseButtonProps {
  label: string;
  onClick: () => void;
}

export function DialogCloseButton({ label, onClick }: DialogCloseButtonProps) {
  return (
    <button
      type="button"
      className="dialog-close-button"
      aria-label={label}
      onClick={onClick}
    >
      <span className="dialog-close-button__icon" aria-hidden="true">
        ×
      </span>
    </button>
  );
}
