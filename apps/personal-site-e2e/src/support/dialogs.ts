import { expect, type Locator } from '@playwright/test';

export async function expectDialogOpen(dialog: Locator) {
  await expect(dialog).toHaveAttribute('open', '');
}

export async function expectDialogClosed(dialog: Locator) {
  await expect(dialog).not.toHaveAttribute('open', '');
}
