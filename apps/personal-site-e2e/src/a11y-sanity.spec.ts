import { expect, test } from '@playwright/test';

test.describe('accessibility sanity', () => {
  test('@regression exposes expected headings and landmarks by route', async ({ page }) => {
    await page.goto('/character');
    await expect(page.getByRole('heading', { level: 2, name: 'Character Sheet' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    await page.goto('/skills');
    await expect(page.getByRole('heading', { level: 2, name: 'Skill Book' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    await page.goto('/quests');
    await expect(page.getByRole('heading', { level: 2, name: 'Quest Board' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('@regression exposes dialog label wiring and keyboard flow', async ({ page }) => {
    await page.goto('/character');
    const messengerLink = page.getByRole('link', { name: 'Messenger' });

    await messengerLink.focus();
    await page.keyboard.press('Enter');

    const dialog = page.locator('dialog.app-dialog:has(.contact-modal)');
    await expect(dialog).toHaveAttribute('aria-labelledby', 'contact-dialog-title');
    await expect(page.locator('#contact-dialog-title')).toHaveText('Messenger');
    await expect(dialog.getByRole('button', { name: 'Close messenger dialog' })).toBeVisible();
  });
});
