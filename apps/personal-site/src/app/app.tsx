import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppDialog } from './components/ui/app-dialog';
import { PageHeader } from './components/ui/page-header';
import { siteContent } from './content/site-content';
import { CharacterPage } from './features/character/character-page';
import { ContactDialog } from './features/contact/contact-dialog';
import { SidebarContent } from './features/navigation/sidebar-content';
import { QuestsPage } from './features/quests/quests-page';
import { SkillsPage } from './features/skills/skills-page';
import { useEscapeToClose } from './hooks/use-escape-to-close';
import { useLockBodyScroll } from './hooks/use-lock-body-scroll';
import { useMobileViewport } from './hooks/use-mobile-viewport';
import { useRouteFocusFirstInteractive } from './hooks/use-route-focus-first-interactive';

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/skills')) {
    return 'Skill Book';
  }
  if (pathname.startsWith('/quests')) {
    return 'Quest Board';
  }
  return 'Character Sheet';
}

export function App() {
  const location = useLocation();
  const contentMainRef = useRef<HTMLElement | null>(null);
  const isCharacterRoute = location.pathname === '/character';
  const isMobileMenuViewport = useMobileViewport(850);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<string | null>(
    siteContent.skills[0]?.title ?? null
  );

  useRouteFocusFirstInteractive(contentMainRef, location.pathname);
  useEscapeToClose(isNavOpen, () => setIsNavOpen(false));
  useLockBodyScroll(isNavOpen && isMobileMenuViewport);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  const handleCloseMenu = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleOpenMessenger = useCallback(() => {
    setIsContactDialogOpen(true);
  }, []);

  const handleCloseContactDialog = useCallback(() => {
    setIsContactDialogOpen(false);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setIsNavOpen(true);
  }, []);

  const currentPageTitle = useMemo(
    () => getPageTitle(location.pathname),
    [location.pathname]
  );

  return (
    <div className="page-bg">
      <div className="pixel-grid-overlay" aria-hidden="true" />
      <div className="site-shell">
        <PageHeader
          title={currentPageTitle}
          icon="✦"
          isMenuOpen={isNavOpen}
          onOpenMenu={handleOpenMenu}
        />
        <div className="layout-grid">
          <aside className={`panel side-nav side-nav--desktop${isNavOpen ? ' is-open' : ''}`}>
            <SidebarContent
              showInlineClose={isNavOpen}
              isCharacterRoute={isCharacterRoute}
              isMobileMenuViewport={isMobileMenuViewport}
              onCloseMenu={handleCloseMenu}
              onOpenMessenger={handleOpenMessenger}
            />
          </aside>

          <main ref={contentMainRef} className="content-stack">
            <Routes>
              <Route path="/" element={<Navigate to="/character" replace />} />
              <Route
                path="/character"
                element={<CharacterPage onOpenMessenger={handleOpenMessenger} />}
              />
              <Route
                path="/skills"
                element={
                  <SkillsPage
                    selectedSkillGroup={selectedSkillGroup}
                    onSelect={setSelectedSkillGroup}
                  />
                }
              />
              <Route path="/quests" element={<QuestsPage />} />
              <Route path="/messenger" element={<Navigate to="/character" replace />} />
              <Route path="*" element={<Navigate to="/character" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      <AppDialog
        isOpen={isNavOpen && isMobileMenuViewport}
        onRequestClose={handleCloseMenu}
        ariaLabelledBy="site-nav-title"
        dialogClassName="side-nav-dialog"
        panelClassName="side-nav side-nav--dialog"
      >
        <h2 id="site-nav-title" className="sr-only">
          Site menu
        </h2>
        <SidebarContent
          showInlineClose
          isCharacterRoute={isCharacterRoute}
          isMobileMenuViewport={isMobileMenuViewport}
          onCloseMenu={handleCloseMenu}
          onOpenMessenger={handleOpenMessenger}
        />
      </AppDialog>

      <ContactDialog
        isOpen={isContactDialogOpen}
        onRequestClose={handleCloseContactDialog}
      />
    </div>
  );
}

export default App;
