import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { siteContent } from '../../content/site-content';
import { QuestsPage } from './quests-page';

describe('QuestsPage', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: function showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: function close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      },
    });
  });

  it('should open quest modal with selected quest content', async () => {
    render(<QuestsPage />);

    fireEvent.click(screen.getAllByRole('button', { name: /View details/i })[0]);

    await waitFor(() => {
      const dialog = document.querySelector<HTMLDialogElement>(
        'dialog.quest-modal-dialog'
      );
      expect(dialog).toBeTruthy();
      if (dialog) {
        expect(
          within(dialog).getByRole('heading', { name: siteContent.projects[0].title })
        ).toBeTruthy();
      }
    });
  });

  it('should switch selected quest when opening another card', async () => {
    render(<QuestsPage />);

    fireEvent.click(screen.getAllByRole('button', { name: /View details/i })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: /View details/i })[1]);

    await waitFor(() => {
      const dialog = document.querySelector<HTMLDialogElement>(
        'dialog.quest-modal-dialog'
      );
      expect(dialog).toBeTruthy();
      if (dialog) {
        expect(
          within(dialog).getByRole('heading', { name: siteContent.projects[1].title })
        ).toBeTruthy();
      }
    });
  });

  it('should close quest modal from close button and action button', async () => {
    render(<QuestsPage />);

    fireEvent.click(screen.getAllByRole('button', { name: /View details/i })[0]);
    await waitFor(() => {
      const dialog = document.querySelector('dialog.quest-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(true);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Close quest dialog' }));
    await waitFor(() => {
      const dialog = document.querySelector('dialog.quest-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(false);
    });

    fireEvent.click(screen.getAllByRole('button', { name: /View details/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Complete Mission' }));
    await waitFor(() => {
      const dialog = document.querySelector('dialog.quest-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(false);
    });
  });
});
