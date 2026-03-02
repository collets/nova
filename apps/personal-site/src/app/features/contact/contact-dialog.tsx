import { mapContactLinksToOptions } from '../../application/site/contact-options';
import { AppDialog } from '../../components/ui/app-dialog';
import { DialogCloseButton } from '../../components/ui/dialog-close-button';
import { siteContent } from '../../content/site-content';

interface ContactDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const contactOptions = mapContactLinksToOptions(siteContent.contact);

export function ContactDialog({ isOpen, onRequestClose }: ContactDialogProps) {
  return (
    <AppDialog
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaLabelledBy="contact-dialog-title"
      panelClassName="contact-modal"
    >
      <header className="contact-modal-header">
        <h3 id="contact-dialog-title" className="ui-title">
          Messenger
        </h3>
        <DialogCloseButton label="Close messenger dialog" onClick={onRequestClose} />
      </header>

      <div className="contact-option-list">
        {contactOptions.map((option) => (
          <a
            key={option.id}
            href={option.href}
            target={option.external ? '_blank' : undefined}
            rel={option.external ? 'nofollow noopener noreferrer' : undefined}
            className="contact-option"
          >
            <span className="skill-ability-badge" aria-hidden="true">
              <span
                className={`project-badge-icon project-badge-icon--${option.iconKind}`}
                aria-hidden="true"
              />
            </span>
            <span className="contact-option-copy">
              <span className="contact-option-title">{option.title}</span>
              <span className="contact-option-detail">{option.detail}</span>
            </span>
            <span className="contact-option-caret" aria-hidden="true">
              ›
            </span>
          </a>
        ))}
      </div>
    </AppDialog>
  );
}
