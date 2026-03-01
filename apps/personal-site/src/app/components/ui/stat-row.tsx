interface StatRowProps {
  name: string;
  level: number;
}

export function StatRow({ name, level }: StatRowProps) {
  return (
    <div className="stat-row">
      <span>{name}</span>
      <span className="stat-value">{level}</span>
    </div>
  );
}
