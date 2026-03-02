import { expect, type Page } from '@playwright/test';

export async function assertHeading(
  page: Page,
  level: 1 | 2 | 3,
  name: string | RegExp
) {
  await expect(page.getByRole('heading', { level, name })).toBeVisible();
}
