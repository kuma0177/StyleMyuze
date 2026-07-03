import { expect, test } from '@playwright/test';
import { expectNoDebugTenantMenu, seedSignedInUser, startFresh } from './fixtures';

test.describe('Myuze smoke checks', () => {
  test('logged-out landing renders with primary auth entry point', async ({ page }) => {
    await startFresh(page);

    await expect(page).toHaveTitle(/Myuze/);
    await expect(page.getByText('Find your style.')).toBeVisible();
    await expect(page.getByTestId('join-waitlist')).toBeVisible();
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
  });

  test('hamburger opens production drawer and logout returns to landing', async ({ page }) => {
    await seedSignedInUser(page);
    await page.goto('/');

    await expect(page.getByText('Hi there')).toBeVisible();
    await expect(page.getByText('Trending looks')).toBeVisible();
    await expect(page.getByText('See all')).toBeVisible();
    await expect(page.getByText('Try on a screenshot')).toHaveCount(0);
    await page.getByTestId('hamburger-menu').click();

    await expect(page.getByLabel('Myuze menu')).toBeVisible();
    await expect(page.getByText('Fit Preferences')).toBeVisible();
    await expect(page.getByText('Try-on History')).toBeVisible();
    await expectNoDebugTenantMenu(page);

    await page.getByTestId('drawer-logout').click();
    await expect(page.getByText('Find your style.')).toBeVisible();
    await expect(page.getByTestId('join-waitlist')).toBeVisible();
    await expect(page.getByLabel('Myuze menu')).toHaveCount(0);
  });
});
