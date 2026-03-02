import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { AppDialog } from './app-dialog';

describe('AppDialog', () => {
  it('should call showModal when opened and not recall while already open', () => {
    const showModalMock = vi.fn(function showModal(this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });

    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: showModalMock,
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: function close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      },
    });

    const onRequestClose = vi.fn();
    const { rerender } = render(
      <AppDialog isOpen={false} onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    expect(showModalMock).toHaveBeenCalledTimes(0);

    rerender(
      <AppDialog isOpen onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    rerender(
      <AppDialog isOpen onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    expect(showModalMock).toHaveBeenCalledTimes(1);
  });

  it('should call close when moved from open to closed', () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: function showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
    });

    const closeMock = vi.fn(function close(this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: closeMock,
    });

    const onRequestClose = vi.fn();
    const { rerender } = render(
      <AppDialog isOpen onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    rerender(
      <AppDialog isOpen={false} onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should handle close and cancel events', () => {
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

    const onRequestClose = vi.fn();
    const { container } = render(
      <AppDialog isOpen onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    const dialog = container.querySelector('dialog');
    expect(dialog).toBeTruthy();
    if (!dialog) {
      return;
    }

    fireEvent(dialog, new Event('close'));
    fireEvent(dialog, new Event('cancel', { cancelable: true }));

    expect(onRequestClose).toHaveBeenCalledTimes(2);
  });

  it('should close on backdrop click and not close on panel click', () => {
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

    const onRequestClose = vi.fn();
    const { container } = render(
      <AppDialog isOpen onRequestClose={onRequestClose} ariaLabelledBy="test-title">
        <h2 id="test-title">Dialog title</h2>
      </AppDialog>
    );

    const dialog = container.querySelector('dialog');
    const panel = container.querySelector('.app-dialog-panel');
    expect(dialog).toBeTruthy();
    expect(panel).toBeTruthy();
    if (!dialog || !panel) {
      return;
    }

    fireEvent.click(panel);
    expect(onRequestClose).toHaveBeenCalledTimes(0);

    fireEvent.click(dialog);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
