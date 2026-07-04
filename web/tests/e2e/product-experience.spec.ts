import { expect, test } from '@playwright/test';
import { expectNoDebugTenantMenu, seedSignedInUser, startFresh } from './fixtures';

test.describe('Myuze product experience', () => {
  test('first-run auth and onboarding reaches the AI stylist home', async ({ page }) => {
    await startFresh(page);

    await page.getByTestId('join-waitlist').click();
    await expect(page.getByRole('heading', { name: 'Enter your email' })).toBeVisible();

    await page.getByPlaceholder('Enter email').fill('maya@myuze.app');
    await page.getByTestId('continue-email').click();
    await expect(page.getByText('Check your email')).toBeVisible();

    await page.getByTestId('verify-otp').click();
    await expect(page.getByText('Set up your account')).toBeVisible();
    await expect(page.getByText('Gender')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Female', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Male', exact: true }).click();

    await page.getByTestId('setup-continue').click();
    await expect(page.getByText('Pick Your Style')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Streetwear', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Casual', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Workwear', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Business Casual', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Classic', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Minimal', exact: true })).toBeVisible();
    await expect(page.getByText('Bohemian')).toHaveCount(0);

    await page.getByTestId('setup-continue').click();
    await expect(page.getByText('Hi there')).toBeVisible();
    await expect(page.getByPlaceholder('Ask me anything...')).toBeVisible();
  });

  test('core signed-in journey: chat, discover, try-on, challenge, share, drawer logout', async ({ page }) => {
    await seedSignedInUser(page);
    await page.goto('/');

    await expect(page.getByText('Hi there')).toBeVisible();
    await expect(page.getByText('Trending looks')).toBeVisible();
    await expect(page.getByText('See all')).toBeVisible();
    await expect(page.getByText('Try on a screenshot')).toHaveCount(0);
    await page.getByText('Style me for a first date').click();
    await expect(page.getByText(/I used Streetwear, Soft Minimal/)).toBeVisible();
    await expect(page.getByText('Try Now').first()).toBeVisible();

    await page.getByTestId('tab-discover').click();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'For You' })).toHaveClass(/active/);

    await page.getByText('Try Now').first().click();
    await expect(page.getByRole('heading', { name: 'Try On', exact: true })).toBeVisible();
    await expect(page.getByText('Challenge')).toBeVisible();
    await expect(page.getByText('Create Reel')).toBeVisible();
    await expect(page.getByText('Shop Now')).toBeVisible();

    await page.getByRole('button', { name: 'Challenge' }).click();
    await expect(page.getByText('Style Challenge')).toBeVisible();
    await expect(page.getByText('Style This Item')).toBeVisible();
    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.getByRole('heading', { name: 'Share' })).toBeVisible();
    await expect(page.getByText('IG')).toBeVisible();

    await page.getByRole('button', { name: '×' }).click();
    await page.getByTestId('hamburger-menu').click();
    await expect(page.getByLabel('Myuze menu')).toBeVisible();
    await expect(page.getByText('Help & Support')).toBeVisible();
    await expectNoDebugTenantMenu(page);

    await page.getByTestId('drawer-fit-preferences').click();
    await expect(page.getByRole('heading', { name: 'Fit Preferences' })).toBeVisible();
    await page.getByRole('button', { name: 'Male', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Workwear', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Classic', exact: true }).click();
    await page.getByRole('button', { name: 'Save preferences' }).click();
    await expect(page.getByTestId('fit-preferences-row')).toBeVisible();
    await page.getByRole('button', { name: 'Log Out' }).click();
    await expect(page.getByText('Find your style.')).toBeVisible();
    await expect(page.getByTestId('join-waitlist')).toBeVisible();
  });
});
