import { expect, test } from '@playwright/test';
import { seedSignedInUser, startFresh } from './fixtures';

test.describe('Myuze smoke checks', () => {
  test('logged-out homepage explains the product and validates email sign-up', async ({ page }) => {
    await startFresh(page);

    await expect(page).toHaveTitle(/Myuze/);
    await expect(
      page.getByRole('heading', {
        name: /Find the look that feels like you\.|Feel like yourself\. Dress for what’s next\./,
      }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue with email' })).toBeVisible();
    await expect(page.locator('.story-navigation span')).toHaveText('01 / 04');
    await page.getByRole('button', { name: 'Next style story' }).click();
    await expect(page.locator('.story-navigation span')).toHaveText('02 / 04');
    await page.getByRole('button', { name: 'Previous style story' }).click();
    await expect(page.locator('.story-navigation span')).toHaveText('01 / 04');
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await expect(page.getByRole('status')).toContainText('valid email');
  });

  test('the production drawer opens and logout returns to the landing screen', async ({ page }) => {
    await seedSignedInUser(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Myuze menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Maya Johnson/ })).toBeVisible();
    await page.getByRole('button', { name: 'Log out' }).click();
    await expect(
      page.getByRole('heading', {
        name: /Find the look that feels like you\.|Feel like yourself\. Dress for what’s next\./,
      }),
    ).toBeVisible();
  });
});
