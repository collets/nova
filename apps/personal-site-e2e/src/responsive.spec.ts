import { expect, test } from '@playwright/test';
import { expectDialogClosed, expectDialogOpen } from './support/dialogs';

test.describe('responsive behavior', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('@smoke opens and closes mobile navigation dialog', async ({ page }) => {
    await page.goto('/character');
    const navDialog = page.locator('dialog.side-nav-dialog');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expectDialogOpen(navDialog);

    await page.getByRole('button', { name: 'Close Menu' }).click();
    await expectDialogClosed(navDialog);
  });

  test('@regression applies and removes body scroll lock while mobile menu is open', async ({
    page,
  }) => {
    await page.goto('/character');
    const navDialog = page.locator('dialog.side-nav-dialog');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expectDialogOpen(navDialog);
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await page.getByRole('button', { name: 'Close Menu' }).click();
    await expectDialogClosed(navDialog);
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('@regression shows sidebar avatar in mobile dialog state', async ({ page }) => {
    await page.goto('/character');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const navDialog = page.locator('dialog.side-nav-dialog');
    await expectDialogOpen(navDialog);

    await expect(navDialog.getByAltText('Character placeholder portrait')).toBeVisible();
  });
});
