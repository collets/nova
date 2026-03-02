import { type MouseEvent as ReactMouseEvent } from 'react';
import { MenuList } from '../../components/ui/menu-list';
import { siteContent } from '../../content/site-content';

interface SidebarContentProps {
  showInlineClose: boolean;
  isCharacterRoute: boolean;
  isMobileMenuViewport: boolean;
  onCloseMenu: () => void;
  onOpenMessenger: () => void;
}

export function SidebarContent({
  showInlineClose,
  isCharacterRoute,
  isMobileMenuViewport,
  onCloseMenu,
  onOpenMessenger,
}: SidebarContentProps) {
  const handleMenuSelect = (
    id: string,
    event: ReactMouseEvent<HTMLAnchorElement>
  ) => {
    if (id !== 'messenger') {
      return;
    }

    event.preventDefault();
    onCloseMenu();
    onOpenMessenger();
  };

  return (
    <>
      {showInlineClose ? (
        <button
          type="button"
          className="pixel-button nav-close-inline"
          onClick={onCloseMenu}
        >
          Close Menu
        </button>
      ) : null}
      <div className="sidebar-profile">
        {!isCharacterRoute || (showInlineClose && isMobileMenuViewport) ? (
          <img
            src="/portrait.png"
            alt="Character placeholder portrait"
            className="sidebar-avatar"
          />
        ) : null}
        <h1 className="sidebar-name">{siteContent.config.name}</h1>
        <p className="sidebar-role">{siteContent.config.role}</p>
        <div className="sidebar-progress">
          <p className="ui-label">experience</p>
          <div className="meter">
            <span className="meter-fill meter-fill--xp" />
          </div>
          <p className="sidebar-level">Level 10 (years)</p>
        </div>
      </div>

      <div className="sidebar-menu">
        <h2 className="ui-label">menu</h2>
        <MenuList items={siteContent.nav} onItemSelect={handleMenuSelect} />
      </div>

      <div className="panel sidebar-stats">
        <div className="stat-entry">
          <span>Reliability</span>
          <span>100%</span>
        </div>
        <div className="meter meter--small">
          <span className="meter-fill meter-fill--hp" />
        </div>
        <div className="stat-entry">
          <span>Focus</span>
          <span>100%</span>
        </div>
        <div className="meter meter--small">
          <span className="meter-fill meter-fill--mp" />
        </div>
      </div>
    </>
  );
}
