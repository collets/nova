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
});
