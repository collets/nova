import { describe, expect, it } from 'vitest';
import { buildQuestViewModels } from './quests';
import { siteContent } from '../../content/site-content';

describe('buildQuestViewModels', () => {
  it('should deterministically enrich projects into quests', () => {
    const quests = buildQuestViewModels(siteContent.projects);

    expect(quests).toHaveLength(siteContent.projects.length);
    expect(quests[0]).toMatchObject({
      id: siteContent.projects[0].id,
      bounty: 'High',
      difficulty: 64,
      isLocked: false,
    });
    expect(quests[4]).toMatchObject({
      id: siteContent.projects[4].id,
      bounty: 'High',
      isLocked: true,
    });
    expect(quests[0].rewards).toContain(siteContent.projects[0].tech[0]);
    expect(quests[0].brief).toContain(siteContent.projects[0].summary);
  });

  it('should fallback rewards when project tech stack is short', () => {
    const quests = buildQuestViewModels([
      {
        id: 'single-tech',
        title: 'Single tech project',
        summary: 'A project with one technology in the stack.',
        tech: ['Vue'],
        badge: { kind: 'shield' },
      },
      {
        id: 'no-tech',
        title: 'No tech project',
        summary: 'A project with empty tech stack.',
        tech: [],
        badge: { kind: 'ring' },
      },
    ]);

    expect(quests[0].rewards[0]).toBe('Vue');
    expect(quests[0].rewards[1]).toBe('React');
    expect(quests[1].rewards[0]).toBe('TypeScript');
    expect(quests[1].rewards[1]).toBe('React');
  });
});
