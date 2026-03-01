import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppDialog } from './components/ui/app-dialog';
import { DialogCloseButton } from './components/ui/dialog-close-button';
import { MenuList } from './components/ui/menu-list';
import { TagChip } from './components/ui/tag-chip';
import { siteContent } from './content/site-content';

interface CharacterPageProps {
  onOpenMessenger: () => void;
}

function CharacterPage({ onOpenMessenger }: CharacterPageProps) {
  const characterInfo = [
    { label: 'True Name', value: siteContent.config.name },
    {
      label: 'Class / Role',
      value: siteContent.config.role,
      valueClassName: 'stat-value-accent',
    },
    { label: 'Alignment', value: 'Lawful Creative', valueClassName: 'stat-value-success' },
    { label: 'Homeland', value: 'Remote Realm' },
    { label: 'Current Quest', value: 'Refactoring The Kingdom UI' },
    { label: 'Guild', value: 'Frontend Order' },
    { label: 'Specialty', value: 'Design Systems & React Architecture' },
    { label: 'Timezone', value: 'CET (UTC+1)' },
    { label: 'Availability', value: 'Open For Selected Quests' },
    { label: 'Focus', value: 'Performance, Accessibility, DX' },
  ];

  return (
    <section id="character" className="character-sheet">
      <div className="character-title-row">
        <span className="character-title-glyph" aria-hidden="true">
          ✦
        </span>
        <h2 className="ui-title">Character Sheet</h2>
      </div>

      <div className="character-grid">
        <div className="character-top-row">
          <article className="panel character-portrait-card">
            <div className="character-portrait-frame">
              <img
                src="/full-figure.png"
                alt="Character portrait placeholder"
                className="character-portrait"
              />
            </div>
            <p className="character-portrait-caption">The Interface Alchemist</p>
          </article>

          <div className="character-top-side">
            <article className="panel character-equipment">
              <h3 className="ui-subtitle">Equipment</h3>
              <div className="equipment-grid">
                <span className="equipment-slot">
                  <span className="material-symbols-outlined equipment-icon">
                    keyboard
                  </span>
                </span>
                <span className="equipment-slot">
                  <span className="material-symbols-outlined equipment-icon">
                    mouse
                  </span>
                </span>
                <span className="equipment-slot">
                  <span className="material-symbols-outlined equipment-icon">
                    terminal
                  </span>
                </span>
              </div>
            </article>

            <article className="panel character-stats">
              <div className="stats-grid">
                {characterInfo.map((entry, index) => (
                  <div key={entry.label} className="stat-item">
                    <p className="stat-label">{entry.label}</p>
                    <p
                      className={`stat-value${
                        entry.valueClassName ? ` ${entry.valueClassName}` : ''
                      }`}
                    >
                      {entry.value}
                    </p>
                    {index < characterInfo.length - 1 ? (
                      <span className="stat-divider" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className="character-bottom-row">

          <article className="panel character-backstory-shell">
            <div className="character-backstory">
              <h3 className="ui-subtitle">Backstory</h3>
              {siteContent.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="character-actions">
            <button
              type="button"
              className="pixel-button action-primary"
              onClick={onOpenMessenger}
            >
              Hire For Quest
            </button>
            <a
              className="pixel-button action-secondary"
              href="/Simone_Coletta_CV.pdf"
              download="Simone_Coletta_CV.pdf"
            >
              Download Scroll (CV)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillsPageProps {
  selectedSkillGroup: string | null;
  onSelect: (title: string) => void;
}

function SkillsPage({ selectedSkillGroup, onSelect }: SkillsPageProps) {
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [selectedUnlockSkill, setSelectedUnlockSkill] = useState('Chrono Refactor');
  const unlockOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeGroup =
    siteContent.skills.find((group) => group.title === selectedSkillGroup) ??
    siteContent.skills[0];
  const unlockSkillOptions = [
    'Chrono Refactor',
    'Arcane Component Forge',
    'Legendary Debug Vision',
  ];
  const handleUnlockOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % unlockSkillOptions.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + unlockSkillOptions.length) % unlockSkillOptions.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = unlockSkillOptions.length - 1;
    }

    if (nextIndex !== currentIndex) {
      setSelectedUnlockSkill(unlockSkillOptions[nextIndex]);
      unlockOptionRefs.current[nextIndex]?.focus();
    }
  };
  const lockedAbilities = [
    {
      name: 'Sealed Technique',
      description:
        'This ability is still locked and will be revealed after future quest progress.',
      badgeKind: 'armor' as const,
    },
    {
      name: 'Unknown Codex',
      description:
        'Hidden knowledge not yet unlocked. Requirements are currently undiscovered.',
      badgeKind: 'ring' as const,
    },
  ];

  useEffect(() => {
    if (!isUnlockModalOpen) {
      return;
    }

    const selectedIndex = unlockSkillOptions.findIndex(
      (skill) => skill === selectedUnlockSkill
    );
    if (selectedIndex >= 0) {
      unlockOptionRefs.current[selectedIndex]?.focus();
    }
  }, [isUnlockModalOpen, selectedUnlockSkill, unlockSkillOptions]);

  return (
    <section id="skills" className="skills-section">
      <div className="character-title-row">
        <span className="character-title-glyph" aria-hidden="true">
          ✦
        </span>
        <h2 className="ui-title skills-title">Skill Book</h2>
      </div>

      <div className="skills-categories">
        {siteContent.skills.map((group) => (
          <div key={group.title} className="skill-category-slot">
            <button
              type="button"
              className={`panel skill-card ${
                selectedSkillGroup === group.title ? 'is-selected' : ''
              }`}
              onClick={() => onSelect(group.title)}
            >
              <header className="skill-card-header skill-card-header--stacked">
                <span className="skill-glyph" aria-hidden="true">
                  {group.icon}
                </span>
                <h3 className="ui-subtitle">{group.title}</h3>
                <span className="skill-unlocked-count">
                  {group.items.length} unlocked
                </span>
              </header>
              <div className="skill-card-light" aria-hidden="true" />
              <div className="skill-card-border-glow" aria-hidden="true" />
              {selectedSkillGroup === group.title ? (
                <span className="skill-selected-badge">Active</span>
              ) : null}
            </button>
          </div>
        ))}
      </div>

      {activeGroup ? (
        <>
          <div className="skills-unlocked-header">
            <p className="skills-unlocked-label">unlocked abilities:</p>
            <p className="skills-unlocked-group">{activeGroup.title}</p>
            <span className="skills-unlocked-line" aria-hidden="true" />
          </div>

          <div className="skills-abilities-grid-wrap">
            <div className="skills-abilities-grid">
              {activeGroup.items.map((skill) => (
                <article key={skill.name} className="panel skill-ability-card">
                  <header className="skill-ability-header">
                    <span
                      className="skill-ability-badge"
                      aria-label={`${skill.badge.kind} icon`}
                    >
                      <span
                        className={`project-badge-icon project-badge-icon--${skill.badge.kind}`}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="skill-ability-rank">
                      <p className="stat-label">Rank</p>
                      <p className="stat-value">{skill.rank}</p>
                    </div>
                  </header>
                  <div className="skill-ability-spacer" aria-hidden="true" />
                  <h3 className="skill-ability-title">{skill.name}</h3>
                  <p className="skill-ability-description">{skill.description}</p>
                  <footer className="skill-ability-footer">
                    <span>LV 99</span>
                    <span className="skill-ability-active">ACTIVE</span>
                  </footer>
                </article>
              ))}
              {lockedAbilities.map((skill) => (
                <article
                  key={skill.name}
                  className="panel skill-ability-card is-locked"
                >
                  <header className="skill-ability-header">
                    <span
                      className="skill-ability-badge"
                      aria-label={`${skill.badgeKind} icon`}
                    >
                      <span
                        className={`project-badge-icon project-badge-icon--${skill.badgeKind}`}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="skill-ability-rank">
                      <p className="stat-label">Rank</p>
                      <p className="stat-value">Unknown</p>
                    </div>
                  </header>
                  <div className="skill-ability-spacer" aria-hidden="true" />
                  <h3 className="skill-ability-title">{skill.name}</h3>
                  <p className="skill-ability-description">{skill.description}</p>
                  <footer className="skill-ability-footer">
                    <span>LV --</span>
                    <span className="skill-ability-locked">LOCKED</span>
                  </footer>
                </article>
              ))}
              <article className="panel skill-ability-card skill-ability-card--unlock">
                <button
                  type="button"
                  className="skill-unlock-trigger"
                  onClick={() => setIsUnlockModalOpen(true)}
                >
                  <div className="skill-unlock-content">
                    <span
                      className="material-symbols-outlined skill-unlock-icon"
                      aria-hidden="true"
                    >
                      add_circle
                    </span>
                    <span className="skill-unlock-label">Unlock Skill</span>
                  </div>
                </button>
              </article>
            </div>
          </div>
        </>
      ) : null}

      <AppDialog
        isOpen={isUnlockModalOpen}
        onRequestClose={() => setIsUnlockModalOpen(false)}
        ariaLabelledBy="unlock-skill-title"
        dialogClassName="skill-modal-dialog"
        panelClassName="skill-modal"
      >
        <header className="skill-modal-header">
          <p className="ui-label">summoning terminal</p>
          <DialogCloseButton
            label="Close unlock dialog"
            onClick={() => setIsUnlockModalOpen(false)}
          />
        </header>

        <div className="skill-modal-body">
          <span className="material-symbols-outlined skill-modal-icon" aria-hidden="true">
            auto_awesome
          </span>
          <h3 id="unlock-skill-title" className="ui-title">
            Scroll Of Infinite Potential
          </h3>
          <p>Choose one technique to pretend-unlock:</p>
          <ul
            className="skill-modal-list"
            role="radiogroup"
            aria-label="Select a skill to pretend unlock"
          >
            {unlockSkillOptions.map((skillName, index) => (
              <li key={skillName} role="presentation">
                <button
                  type="button"
                  ref={(element) => {
                    unlockOptionRefs.current[index] = element;
                  }}
                  className={`skill-modal-option${
                    selectedUnlockSkill === skillName ? ' is-selected' : ''
                  }`}
                  onClick={() => setSelectedUnlockSkill(skillName)}
                  onKeyDown={(event) => handleUnlockOptionKeyDown(event, index)}
                  role="radio"
                  aria-checked={selectedUnlockSkill === skillName}
                  tabIndex={selectedUnlockSkill === skillName ? 0 : -1}
                >
                  <span>{skillName}</span>
                  <span className="skill-modal-check" aria-hidden="true">
                    ✓
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="skill-modal-note">
            Status: <span>Roleplay Only</span> (this does not actually add skills)
          </p>
        </div>

        <footer className="skill-modal-footer">
          <button
            type="button"
            className="pixel-button action-secondary"
            onClick={() => setIsUnlockModalOpen(false)}
          >
            Back To Skill Book
          </button>
          <button
            type="button"
            className="pixel-button action-primary"
            onClick={() => setIsUnlockModalOpen(false)}
          >
            Pretend Unlock
          </button>
        </footer>
      </AppDialog>
    </section>
  );
}

function QuestsPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const bountyLevels = ['High', 'Legendary', 'Epic', 'Rare'] as const;
  const quests = siteContent.projects.map((project, index) => ({
    ...project,
    bounty: bountyLevels[index % bountyLevels.length],
    difficulty: 64 + ((index * 7) % 36),
    isLocked: index >= 4,
    brief: `${project.summary} Coordinate execution, ship stable UX polish, and deliver measurable product impact across the release cycle.`,
    rewards: [
      project.tech[0] ?? 'TypeScript',
      project.tech[1] ?? 'React',
      index % 2 === 0 ? '+80% performance' : '+35% conversion',
      index % 2 === 0 ? 'AWS DynamoDB' : 'CI lead time -40%',
    ],
  }));
  const selectedQuest = quests.find((quest) => quest.id === selectedQuestId) ?? quests[0];

  const handleOpenQuest = (questId: string) => {
    setSelectedQuestId(questId);
    setIsQuestModalOpen(true);
  };

  return (
    <section id="quests" className="quests-section">
      <div className="character-title-row">
        <span className="character-title-glyph" aria-hidden="true">
          ✦
        </span>
        <h2 className="ui-title">Quest Board</h2>
      </div>

      <div className="quests-grid-wrap">
        <div className="quests-grid">
          {quests.map((quest) => (
            <article key={quest.id} className="panel skill-ability-card quest-card">
              <header className="skill-ability-header">
                <span
                  className="skill-ability-badge"
                  aria-label={`${quest.badge.kind} icon`}
                >
                  <span
                    className={`project-badge-icon project-badge-icon--${quest.badge.kind}`}
                    aria-hidden="true"
                  />
                </span>
                <div className="skill-ability-rank">
                  <p className="stat-label">Bounty</p>
                  <p className="stat-value">{quest.bounty}</p>
                </div>
              </header>
              <div className="skill-ability-spacer" aria-hidden="true" />
              <h3 className="skill-ability-title">{quest.title}</h3>
              <p className="skill-ability-description">
                <span className="quest-objective-prefix">Objective:</span>{' '}
                {quest.summary}
              </p>
              <footer className="skill-ability-footer quest-card-footer">
                <div className="quest-difficulty-block">
                  <span className="stat-label">Difficulty</span>
                  <span className="stat-value">LV {quest.difficulty}</span>
                </div>
                <button
                  type="button"
                  className="pixel-button action-secondary quest-state-button"
                  aria-label={`View details (${quest.isLocked ? 'locked' : 'active'})`}
                  onClick={() => handleOpenQuest(quest.id)}
                >
                  View Details
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <AppDialog
        isOpen={isQuestModalOpen}
        onRequestClose={() => setIsQuestModalOpen(false)}
        ariaLabelledBy="quest-modal-title"
        dialogClassName="quest-modal-dialog"
        panelClassName="quest-modal"
      >
        <header className="quest-modal-header">
          <div className="quest-modal-header-top">
            <p className="ui-label">active quest</p>
            <DialogCloseButton
              label="Close quest dialog"
              onClick={() => setIsQuestModalOpen(false)}
            />
          </div>
          <h3 id="quest-modal-title" className="ui-title quest-modal-title">
            {selectedQuest.title}
          </h3>
        </header>

        <span className="quest-modal-separator" aria-hidden="true" />

        <div className="quest-modal-section-heading">
          <span className="material-symbols-outlined" aria-hidden="true">
            menu_book
          </span>
          <p className="ui-label">brief</p>
        </div>
        <p className="quest-modal-description">{selectedQuest.brief}</p>

        <div className="quest-modal-section-heading">
          <span className="material-symbols-outlined" aria-hidden="true">
            payments
          </span>
          <p className="ui-label">rewards</p>
        </div>
        <div className="tag-wrap">
          {selectedQuest.rewards.map((reward) => (
            <TagChip key={reward} label={reward} />
          ))}
        </div>

        <button
          type="button"
          className="pixel-button action-primary quest-complete-button"
          onClick={() => setIsQuestModalOpen(false)}
        >
          Complete Mission
        </button>
      </AppDialog>
    </section>
  );
}

export function App() {
  const location = useLocation();
  const isCharacterRoute = location.pathname === '/character';
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<string | null>(
    siteContent.skills[0]?.title ?? null
  );
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const contactOptions = [
    {
      id: 'owl',
      title: 'Send an Owl',
      detail: 'simone.coletta@outlook.com',
      href: 'mailto:simone.coletta@outlook.com',
      iconKind: 'scroll-purple' as const,
    },
    {
      id: 'guild',
      title: 'Guild Network',
      detail: 'View Professional Rank',
      href: 'https://www.linkedin.com/in/simone-coletta',
      iconKind: 'scroll-blue' as const,
    },
    {
      id: 'repository',
      title: 'Ancient Repository',
      detail: 'Inspect Source Spells',
      href: 'https://github.com/scoletta',
      iconKind: 'scroll-red' as const,
    },
  ];

  const handleSelectSkillGroup = (title: string) => {
    setSelectedSkillGroup(title);
  };
  const handleOpenMessenger = () => {
    setIsContactDialogOpen(true);
  };
  const handleMenuSelect = (id: string, event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (id !== 'messenger') {
      return;
    }

    event.preventDefault();
    handleOpenMessenger();
  };

  return (
    <div className="page-bg">
      <div className="pixel-grid-overlay" aria-hidden="true" />
      <div className="site-shell">
        <div className="layout-grid">
          <aside className="panel side-nav">
            <div className="sidebar-profile">
              {!isCharacterRoute ? (
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
          </aside>

          <main className="content-stack">
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
                    onSelect={handleSelectSkillGroup}
                  />
                }
              />
              <Route
                path="/quests"
                element={<QuestsPage />}
              />
              <Route path="/messenger" element={<Navigate to="/character" replace />} />
              <Route path="*" element={<Navigate to="/character" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      <AppDialog
        isOpen={isContactDialogOpen}
        onRequestClose={() => setIsContactDialogOpen(false)}
        ariaLabelledBy="contact-dialog-title"
        panelClassName="contact-modal"
      >
        <header className="contact-modal-header">
          <h3 id="contact-dialog-title" className="ui-title">
            Messenger
          </h3>
          <DialogCloseButton
            label="Close messenger dialog"
            onClick={() => setIsContactDialogOpen(false)}
          />
        </header>

        <div className="contact-option-list">
          {contactOptions.map((option) => (
            <a
              key={option.id}
              href={option.href}
              target="_blank"
              rel="nofollow noreferrer"
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
    </div>
  );
}

export default App;
