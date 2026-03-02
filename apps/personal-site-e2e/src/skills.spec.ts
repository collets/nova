import { expect, test } from '@playwright/test';
import { expectDialogClosed, expectDialogOpen } from './support/dialogs';

test.describe('skills flow', () => {
  test('@smoke changes selected skill group and updates active section', async ({ page }) => {
    await page.goto('/skills');

    await page.getByRole('button', { name: /Toolsmithing/i }).click();
    await expect(page.locator('.skills-unlocked-group')).toHaveText('Toolsmithing');
  });

  test('@regression opens and closes unlock modal with controls', async ({ page }) => {
    await page.goto('/skills');
    const dialog = page.locator('dialog.skill-modal-dialog');

    await page.getByRole('button', { name: 'Unlock Skill' }).click();
    await expectDialogOpen(dialog);

    await page.getByRole('button', { name: 'Close unlock dialog' }).click();
    await expectDialogClosed(dialog);

    await page.getByRole('button', { name: 'Unlock Skill' }).click();
    await expectDialogOpen(dialog);
    await page.getByRole('button', { name: 'Back To Skill Book' }).click();
    await expectDialogClosed(dialog);
  });

  test('@regression closes unlock modal with Escape', async ({ page }) => {
    await page.goto('/skills');
    const dialog = page.locator('dialog.skill-modal-dialog');

    await page.getByRole('button', { name: 'Unlock Skill' }).click();
    await expectDialogOpen(dialog);
    await page.keyboard.press('Escape');
    await expectDialogClosed(dialog);
  });

  test('@regression supports arrow wrapping and home/end keyboard navigation', async ({
    page,
  }) => {
    await page.goto('/skills');
    await page.getByRole('button', { name: 'Unlock Skill' }).click();

    const first = page.getByRole('radio', { name: 'Chrono Refactor' });
    const second = page.getByRole('radio', { name: 'Arcane Component Forge' });
    const last = page.getByRole('radio', { name: 'Legendary Debug Vision' });

    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect(second).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('ArrowLeft');
    await expect(first).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('End');
    await expect(last).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('ArrowDown');
    await expect(first).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('Home');
    await expect(first).toHaveAttribute('aria-checked', 'true');
  });

  test('@regression ignores non-navigation keys in skill radio list', async ({ page }) => {
    await page.goto('/skills');
    await page.getByRole('button', { name: 'Unlock Skill' }).click();

    const first = page.getByRole('radio', { name: 'Chrono Refactor' });
    await first.focus();
    await page.keyboard.press('a');

    await expect(first).toHaveAttribute('aria-checked', 'true');
  });
});
