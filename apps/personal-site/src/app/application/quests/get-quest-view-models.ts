import { buildQuestViewModels, type QuestViewModel } from '../../domain/quests/quests';
import { type ProjectEntry } from '../../types/site';

export function getQuestViewModels(projects: ProjectEntry[]): QuestViewModel[] {
  return buildQuestViewModels(projects);
}
