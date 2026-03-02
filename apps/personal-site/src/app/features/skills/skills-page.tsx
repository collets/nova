import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';
import { AbilityCard } from '../../components/ui/ability-card';
import { AppDialog } from '../../components/ui/app-dialog';
import { DialogCloseButton } from '../../components/ui/dialog-close-button';
import { siteContent } from '../../content/site-content';
import { lockedAbilities, unlockSkillOptions } from '../../domain/skills/skills';

interface SkillsPageProps {
  selectedSkillGroup: string | null;
  onSelect: (title: string) => void;
}

export function SkillsPage({ selectedSkillGroup, onSelect }: SkillsPageProps) {
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  type UnlockSkillOption = (typeof unlockSkillOptions)[number];
  const [selectedUnlockSkill, setSelectedUnlockSkill] =
    useState<UnlockSkillOption>(unlockSkillOptions[0]);
  const unlockOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeGroup =
    siteContent.skills.find((group) => group.title === selectedSkillGroup) ??
    siteContent.skills[0];

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
  }, [isUnlockModalOpen, selectedUnlockSkill]);

  return (
    <section id="skills" className="skills-section">
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
                <span className="skill-unlocked-count">{group.items.length} unlocked</span>
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
                <AbilityCard
                  key={skill.name}
                  name={skill.name}
                  description={skill.description}
                  rank={skill.rank}
                  badgeKind={skill.badge.kind}
                  levelLabel="LV 99"
                  statusLabel="ACTIVE"
                  statusClassName="skill-ability-active"
                />
              ))}
              {lockedAbilities.map((skill) => (
                <AbilityCard
                  key={skill.name}
                  name={skill.name}
                  description={skill.description}
                  rank="Unknown"
                  badgeKind={skill.badgeKind}
                  levelLabel="LV --"
                  statusLabel="LOCKED"
                  statusClassName="skill-ability-locked"
                  isLocked
                />
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
