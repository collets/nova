import { expect, test } from '@playwright/test';
import { assertHeading } from './support/navigation';
import { headings, navLinks } from './support/selectors';

test.describe('routing coverage', () => {
  test('@smoke redirects root to /character', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/character$/);
    await assertHeading(page, headings.character.level, headings.character.name);
  });

  test('@regression redirects /messenger to /character', async ({ page }) => {
    await page.goto('/messenger');
    await expect(page).toHaveURL(/\/character$/);
  });

  test('@regression redirects unknown routes to /character', async ({ page }) => {
    await page.goto('/totally-unknown');
    await expect(page).toHaveURL(/\/character$/);
  });

  test('@regression updates page header by route', async ({ page }) => {
    await page.goto('/character');
    await assertHeading(page, headings.character.level, headings.character.name);

    await page.getByRole('link', { name: navLinks.skills }).click();
    await assertHeading(page, headings.skills.level, headings.skills.name);

    await page.getByRole('link', { name: navLinks.quests }).click();
    await assertHeading(page, headings.quests.level, headings.quests.name);
  });

  test('@regression updates active nav state while navigating', async ({ page }) => {
    await page.goto('/character');

    const characterLink = page.getByRole('link', { name: navLinks.character });
    await expect(characterLink).toHaveClass(/is-active/);

    await page.getByRole('link', { name: navLinks.skills }).click();
    const skillsLink = page.getByRole('link', { name: navLinks.skills });
    await expect(skillsLink).toHaveClass(/is-active/);

    await page.getByRole('link', { name: navLinks.quests }).click();
    const questsLink = page.getByRole('link', { name: navLinks.quests });
    await expect(questsLink).toHaveClass(/is-active/);
  });
});
