interface BadgeIconProps {
  kind: string;
  label: string;
}

export function BadgeIcon({ kind, label }: BadgeIconProps) {
  return (
    <span className="skill-ability-badge" aria-label={label}>
      <span className={`project-badge-icon project-badge-icon--${kind}`} aria-hidden="true" />
    </span>
  );
}
