interface PageHeaderProps {
  title: string;
  icon?: string;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
}

export function PageHeader({
  title,
  icon = '✦',
  isMenuOpen,
  onOpenMenu,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-title-wrap">
        <span className="character-title-glyph" aria-hidden="true">
          {icon}
        </span>
        <h2 className="ui-title page-header-title">{title}</h2>
      </div>
      <button
        type="button"
        className={`pixel-button page-header-menu-button${isMenuOpen ? ' is-hidden' : ''}`}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={onOpenMenu}
        data-focus-ignore="true"
      >
        Open Menu
      </button>
    </header>
  );
}

