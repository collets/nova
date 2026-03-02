import { render, screen } from '@testing-library/react';
import { AbilityCard } from './ability-card';

describe('AbilityCard', () => {
  const baseProps = {
    name: 'TypeScript & JavaScript',
    description: 'Type-safe frontend engineering.',
    rank: 'Legendary',
    badgeKind: 'ring',
    levelLabel: 'LV 99',
    statusLabel: 'ACTIVE',
    statusClassName: 'skill-ability-active',
  };

  it('should render an unlocked ability card', () => {
    const { container } = render(<AbilityCard {...baseProps} />);

    expect(screen.getByText('TypeScript & JavaScript')).toBeTruthy();
    expect(screen.getByText('Legendary')).toBeTruthy();
    expect(container.querySelector('.skill-ability-card.is-locked')).toBeNull();
  });

  it('should render a locked ability card state', () => {
    const { container } = render(
      <AbilityCard
        {...baseProps}
        isLocked
        rank="Unknown"
        statusLabel="LOCKED"
        statusClassName="skill-ability-locked"
      />
    );

    expect(screen.getByText('Unknown')).toBeTruthy();
    expect(screen.getByText('LOCKED')).toBeTruthy();
    expect(container.querySelector('.skill-ability-card.is-locked')).toBeTruthy();
  });
});
