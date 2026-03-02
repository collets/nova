import { useMemo, useState } from 'react';
import { getQuestViewModels } from '../../application/quests/get-quest-view-models';
import { AppDialog } from '../../components/ui/app-dialog';
import { DialogCloseButton } from '../../components/ui/dialog-close-button';
import { QuestCard } from '../../components/ui/quest-card';
import { TagChip } from '../../components/ui/tag-chip';
import { siteContent } from '../../content/site-content';

export function QuestsPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

  const quests = useMemo(() => getQuestViewModels(siteContent.projects), []);
  const selectedQuest = quests.find((quest) => quest.id === selectedQuestId) ?? quests[0];

  const handleOpenQuest = (questId: string) => {
    setSelectedQuestId(questId);
    setIsQuestModalOpen(true);
  };

  return (
    <section id="quests" className="quests-section">
      <div className="quests-grid-wrap">
        <div className="quests-grid">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              id={quest.id}
              title={quest.title}
              summary={quest.summary}
              badgeKind={quest.badge.kind}
              bounty={quest.bounty}
              difficulty={quest.difficulty}
              isLocked={quest.isLocked}
              onOpen={handleOpenQuest}
            />
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
