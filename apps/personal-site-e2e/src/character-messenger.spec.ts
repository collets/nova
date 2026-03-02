import { expect, test } from '@playwright/test';
import { expectDialogClosed, expectDialogOpen } from './support/dialogs';
import { headings, navLinks } from './support/selectors';

test.describe('character and messenger flows', () => {
  test('@smoke opens messenger from sidebar without route change', async ({ page }) => {
    await page.goto('/character');

    await page.getByRole('link', { name: navLinks.messenger }).click();
    await expect(page).toHaveURL(/\/character$/);
    await expect(
      page.getByRole('heading', { level: headings.messenger.level, name: headings.messenger.name })
    ).toBeVisible();
  });

  test('@regression opens messenger from character CTA', async ({ page }) => {
    await page.goto('/character');

    await page.getByRole('button', { name: 'Hire For Quest' }).click();
    await expect(
      page.getByRole('heading', { level: headings.messenger.level, name: headings.messenger.name })
    ).toBeVisible();
  });

  test('@regression closes messenger dialog by close button and Escape', async ({ page }) => {
    await page.goto('/character');
    const dialog = page.locator('dialog.app-dialog:has(.contact-modal)');

    await page.getByRole('link', { name: navLinks.messenger }).click();
    await expectDialogOpen(dialog);

    await page.getByRole('button', { name: 'Close messenger dialog' }).click();
    await expectDialogClosed(dialog);

    await page.getByRole('link', { name: navLinks.messenger }).click();
    await expectDialogOpen(dialog);
    await page.keyboard.press('Escape');
    await expectDialogClosed(dialog);
  });

  test('@regression enforces external link attributes in messenger dialog', async ({
    page,
  }) => {
    await page.goto('/character');
    await page.getByRole('link', { name: navLinks.messenger }).click();

    const email = page.getByRole('link', { name: /Send an Owl/i });
    const linkedin = page.getByRole('link', { name: /Guild Network/i });
    const github = page.getByRole('link', { name: /Ancient Repository/i });

    await expect(email).not.toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(github).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', /noopener/);
    await expect(github).toHaveAttribute('rel', /noopener/);
  });
});
