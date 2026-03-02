import { BadgeIcon } from './badge-icon';

interface QuestCardProps {
  id: string;
  title: string;
  summary: string;
  badgeKind: string;
  bounty: string;
  difficulty: number;
  isLocked: boolean;
  onOpen: (questId: string) => void;
}

export function QuestCard({
  id,
  title,
  summary,
  badgeKind,
  bounty,
  difficulty,
  isLocked,
  onOpen,
}: QuestCardProps) {
  return (
    <article className="panel skill-ability-card quest-card">
      <header className="skill-ability-header">
        <BadgeIcon kind={badgeKind} label={`${badgeKind} icon`} />
        <div className="skill-ability-rank">
          <p className="stat-label">Bounty</p>
          <p className="stat-value">{bounty}</p>
        </div>
      </header>
      <div className="skill-ability-spacer" aria-hidden="true" />
      <h3 className="skill-ability-title">{title}</h3>
      <p className="skill-ability-description">
        <span className="quest-objective-prefix">Objective:</span> {summary}
      </p>
      <footer className="skill-ability-footer quest-card-footer">
        <div className="quest-difficulty-block">
          <span className="stat-label">Difficulty</span>
          <span className="stat-value">LV {difficulty}</span>
        </div>
        <button
          type="button"
          className="pixel-button action-secondary quest-state-button"
          aria-label={`View details (${isLocked ? 'locked' : 'active'})`}
          onClick={() => onOpen(id)}
        >
          View Details
        </button>
      </footer>
    </article>
  );
}
