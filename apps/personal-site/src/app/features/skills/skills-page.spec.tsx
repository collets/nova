import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { siteContent } from '../../content/site-content';
import { unlockSkillOptions } from '../../domain/skills/skills';
import { SkillsPage } from './skills-page';

function renderSkillsPage(
  selectedSkillGroup: string | null = siteContent.skills[0]?.title ?? null,
  onSelect = vi.fn()
) {
  const result = render(
    <SkillsPage selectedSkillGroup={selectedSkillGroup} onSelect={onSelect} />
  );
  return { ...result, onSelect };
}

describe('SkillsPage', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: function showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value: function close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      },
    });
  });

  it('should fallback to first skill group when selected group is invalid', () => {
    const { container } = renderSkillsPage('Unknown Group');

    expect(container.querySelector('.skills-unlocked-group')?.textContent).toBe(
      siteContent.skills[0].title
    );
    expect(screen.getByText('unlocked abilities:')).toBeTruthy();
  });

  it('should call onSelect when picking a different skill group', () => {
    const { onSelect } = renderSkillsPage();

    fireEvent.click(screen.getByRole('button', { name: /Toolsmithing/i }));

    expect(onSelect).toHaveBeenCalledWith('Toolsmithing');
  });

  it('should open and close unlock modal using action buttons', async () => {
    renderSkillsPage();

    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));

    await waitFor(() => {
      const dialog = document.querySelector('dialog.skill-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(true);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Back To Skill Book' }));

    await waitFor(() => {
      const dialog = document.querySelector('dialog.skill-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(false);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pretend Unlock' }));

    await waitFor(() => {
      const dialog = document.querySelector('dialog.skill-modal-dialog');
      expect(dialog?.hasAttribute('open')).toBe(false);
    });
  });

  it('should focus selected option when modal opens', async () => {
    renderSkillsPage();

    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));

    await waitFor(() => {
      expect(
        screen.getByRole('radio', { name: unlockSkillOptions[0] })
      ).toBeTruthy();
    });

    expect(document.activeElement?.textContent).toContain(unlockSkillOptions[0]);
  });

  it('should move selection with arrow keys and wrap at boundaries', () => {
    renderSkillsPage();
    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));

    const first = screen.getByRole('radio', { name: unlockSkillOptions[0] });
    const second = screen.getByRole('radio', { name: unlockSkillOptions[1] });
    const last = screen.getByRole('radio', {
      name: unlockSkillOptions[unlockSkillOptions.length - 1],
    });

    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(second.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(second);

    fireEvent.keyDown(second, { key: 'ArrowUp' });
    expect(first.getAttribute('aria-checked')).toBe('true');

    fireEvent.click(last);
    fireEvent.keyDown(last, { key: 'ArrowDown' });
    expect(first.getAttribute('aria-checked')).toBe('true');
  });

  it('should support Home and End keyboard shortcuts', () => {
    renderSkillsPage();
    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));

    const first = screen.getByRole('radio', { name: unlockSkillOptions[0] });
    const second = screen.getByRole('radio', { name: unlockSkillOptions[1] });
    const last = screen.getByRole('radio', {
      name: unlockSkillOptions[unlockSkillOptions.length - 1],
    });

    fireEvent.click(second);
    fireEvent.keyDown(second, { key: 'End' });
    expect(last.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(last);

    fireEvent.keyDown(last, { key: 'Home' });
    expect(first.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(first);
  });

  it('should ignore non-navigation keys', () => {
    renderSkillsPage();
    fireEvent.click(screen.getByRole('button', { name: 'Unlock Skill' }));

    const first = screen.getByRole('radio', { name: unlockSkillOptions[0] });
    fireEvent.keyDown(first, { key: 'x' });

    expect(first.getAttribute('aria-checked')).toBe('true');
    expect(document.activeElement).toBe(first);
  });
});
