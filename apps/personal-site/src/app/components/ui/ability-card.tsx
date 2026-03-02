import { BadgeIcon } from './badge-icon';

interface AbilityCardProps {
  name: string;
  description: string;
  rank: string;
  badgeKind: string;
  levelLabel: string;
  statusLabel: string;
  statusClassName: string;
  isLocked?: boolean;
}

export function AbilityCard({
  name,
  description,
  rank,
  badgeKind,
  levelLabel,
  statusLabel,
  statusClassName,
  isLocked = false,
}: AbilityCardProps) {
  return (
    <article className={`panel skill-ability-card${isLocked ? ' is-locked' : ''}`}>
      <header className="skill-ability-header">
        <BadgeIcon kind={badgeKind} label={`${badgeKind} icon`} />
        <div className="skill-ability-rank">
          <p className="stat-label">Rank</p>
          <p className="stat-value">{rank}</p>
        </div>
      </header>
      <div className="skill-ability-spacer" aria-hidden="true" />
      <h3 className="skill-ability-title">{name}</h3>
      <p className="skill-ability-description">{description}</p>
      <footer className="skill-ability-footer">
        <span>{levelLabel}</span>
        <span className={statusClassName}>{statusLabel}</span>
      </footer>
    </article>
  );
}
