import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SidebarContent } from './sidebar-content';

function renderSidebar(
  overrides: Partial<ComponentProps<typeof SidebarContent>> = {}
) {
  const onCloseMenu = vi.fn();
  const onOpenMessenger = vi.fn();

  render(
    <MemoryRouter initialEntries={['/character']}>
      <SidebarContent
        showInlineClose={false}
        isCharacterRoute
        isMobileMenuViewport={false}
        onCloseMenu={onCloseMenu}
        onOpenMessenger={onOpenMessenger}
        {...overrides}
      />
    </MemoryRouter>
  );

  return { onCloseMenu, onOpenMessenger };
}

describe('SidebarContent', () => {
  it('should intercept messenger navigation and open messenger callback', () => {
    const { onCloseMenu, onOpenMessenger } = renderSidebar();
    const messengerLink = screen.getByRole('link', { name: /Messenger/i });
    const clickEvent = createEvent.click(messengerLink);

    fireEvent(messengerLink, clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(onCloseMenu).toHaveBeenCalledTimes(1);
    expect(onOpenMessenger).toHaveBeenCalledTimes(1);
  });

  it('should not trigger messenger callback for non-messenger items', () => {
    const { onCloseMenu, onOpenMessenger } = renderSidebar();

    fireEvent.click(screen.getByRole('link', { name: /Character/i }));

    expect(onCloseMenu).toHaveBeenCalledTimes(0);
    expect(onOpenMessenger).toHaveBeenCalledTimes(0);
  });

  it('should show avatar on non-character route', () => {
    renderSidebar({ isCharacterRoute: false });
    expect(screen.getByAltText('Character placeholder portrait')).toBeTruthy();
  });

  it('should show avatar when mobile menu dialog is open on character route', () => {
    renderSidebar({
      isCharacterRoute: true,
      showInlineClose: true,
      isMobileMenuViewport: true,
    });

    expect(screen.getByAltText('Character placeholder portrait')).toBeTruthy();
  });

  it('should hide avatar on character desktop route', () => {
    renderSidebar({
      isCharacterRoute: true,
      showInlineClose: false,
      isMobileMenuViewport: false,
    });

    expect(screen.queryByAltText('Character placeholder portrait')).toBeNull();
  });

  it('should render inline close button only when enabled', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/character']}>
        <SidebarContent
          showInlineClose={false}
          isCharacterRoute
          isMobileMenuViewport={false}
          onCloseMenu={vi.fn()}
          onOpenMessenger={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: 'Close Menu' })).toBeNull();

    rerender(
      <MemoryRouter initialEntries={['/character']}>
        <SidebarContent
          showInlineClose
          isCharacterRoute
          isMobileMenuViewport={false}
          onCloseMenu={vi.fn()}
          onOpenMessenger={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Close Menu' })).toBeTruthy();
  });
});
