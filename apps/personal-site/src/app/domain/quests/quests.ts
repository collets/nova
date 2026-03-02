import { type ProjectEntry } from '../../types/site';

export type QuestBounty = 'High' | 'Legendary' | 'Epic' | 'Rare';

export interface QuestViewModel extends ProjectEntry {
  bounty: QuestBounty;
  difficulty: number;
  isLocked: boolean;
  brief: string;
  rewards: string[];
}

const bountyLevels: QuestBounty[] = ['High', 'Legendary', 'Epic', 'Rare'];

export function buildQuestViewModels(projects: ProjectEntry[]): QuestViewModel[] {
  return projects.map((project, index) => ({
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
}
