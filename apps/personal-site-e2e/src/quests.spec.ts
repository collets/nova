import { expect, test } from '@playwright/test';
import { expectDialogClosed, expectDialogOpen } from './support/dialogs';

test.describe('quests flow', () => {
  test('@smoke opens first quest and shows details with rewards', async ({ page }) => {
    await page.goto('/quests');

    await page.getByRole('button', { name: /View details/i }).first().click();
    const dialog = page.locator('dialog.quest-modal-dialog');
    await expectDialogOpen(dialog);

    await expect(dialog.getByRole('heading', { level: 3, name: /Docebo Spa/i })).toBeVisible();
    await expect(dialog.getByText('brief', { exact: true })).toBeVisible();
    await expect(dialog.locator('.tag-wrap .tag-chip').first()).toBeVisible();
  });

  test('@regression switches selected quest content in modal', async ({ page }) => {
    await page.goto('/quests');
    const dialog = page.locator('dialog.quest-modal-dialog');

    await page.getByRole('button', { name: /View details/i }).first().click();
    await expect(dialog.getByRole('heading', { level: 3, name: /Docebo Spa/i })).toBeVisible();
    await page.getByRole('button', { name: 'Close quest dialog' }).click();
    await expectDialogClosed(dialog);

    await page.getByRole('button', { name: /View details/i }).nth(1).click();
    await expectDialogOpen(dialog);
    await expect(dialog.getByRole('heading', { level: 3, name: /SIAV Spa/i })).toBeVisible();
    await expect(dialog.locator('.tag-wrap .tag-chip')).toHaveCount(4);
  });

  test('@regression closes quest modal by close button, complete button, and Escape', async ({
    page,
  }) => {
    await page.goto('/quests');
    const dialog = page.locator('dialog.quest-modal-dialog');

    await page.getByRole('button', { name: /View details/i }).first().click();
    await expectDialogOpen(dialog);
    await page.getByRole('button', { name: 'Close quest dialog' }).click();
    await expectDialogClosed(dialog);

    await page.getByRole('button', { name: /View details/i }).first().click();
    await expectDialogOpen(dialog);
    await page.getByRole('button', { name: 'Complete Mission' }).click();
    await expectDialogClosed(dialog);

    await page.getByRole('button', { name: /View details/i }).first().click();
    await expectDialogOpen(dialog);
    await page.keyboard.press('Escape');
    await expectDialogClosed(dialog);
  });
});
