import { type BadgeKind } from '../site/value-objects';

export interface LockedAbility {
  name: string;
  description: string;
  badgeKind: BadgeKind;
}

export const unlockSkillOptions = [
  'Chrono Refactor',
  'Arcane Component Forge',
  'Legendary Debug Vision',
] as const;

export const lockedAbilities: LockedAbility[] = [
  {
    name: 'Sealed Technique',
    description:
      'This ability is still locked and will be revealed after future quest progress.',
    badgeKind: 'armor',
  },
  {
    name: 'Unknown Codex',
    description:
      'Hidden knowledge not yet unlocked. Requirements are currently undiscovered.',
    badgeKind: 'ring',
  },
];
