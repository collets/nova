import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
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

  afterEach(() => {
    window.innerWidth = 1024;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  });

  function renderApp(pathname: string) {
    render(
      <MemoryRouter initialEntries={[pathname]}>
        <App />
      </MemoryRouter>
    );
  }

  it('should render successfully', () => {
    renderApp('/character');
    expect(document.body).toBeTruthy();
  });

  it('should render character page by route', () => {
    renderApp('/character');
    expect(screen.getByRole('heading', { name: 'Character Sheet' })).toBeTruthy();
  });

  it('should render quests page by route', () => {
    renderApp('/quests');
    expect(screen.getByRole('heading', { name: 'Quest Board' })).toBeTruthy();
  });

  it('should redirect root to character page', async () => {
    renderApp('/');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Character Sheet' })).toBeTruthy();
    });
  });

  it('should redirect messenger route to character page', async () => {
    renderApp('/messenger');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Character Sheet' })).toBeTruthy();
    });
  });

  it('should redirect unknown routes to character page', async () => {
    renderApp('/unknown-route');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Character Sheet' })).toBeTruthy();
    });
  });

  it('should open and close menu with Escape when open', async () => {
    renderApp('/character');

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close Menu' })).toBeTruthy();

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Close Menu' })).toBeNull();
    });
  });

  it('should close menu on route change', async () => {
    renderApp('/character');

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close Menu' })).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByRole('link', { name: /Quests/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Quest Board' })).toBeTruthy();
      expect(screen.queryByRole('button', { name: 'Close Menu' })).toBeNull();
    });
  });

  it('should open messenger dialog from sidebar action', async () => {
    renderApp('/character');

    fireEvent.click(screen.getByRole('link', { name: /Messenger/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Messenger' })).toBeTruthy();
    });
  });

  it('should gate side nav dialog by mobile viewport', async () => {
    window.innerWidth = 700;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    renderApp('/character');
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    await waitFor(() => {
      const dialog = document.querySelector('dialog.side-nav-dialog');
      expect(dialog?.hasAttribute('open')).toBe(true);
    });
  });
});
