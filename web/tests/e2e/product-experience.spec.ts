import { expect, test } from '@playwright/test';
import { seedSignedInUser, startFresh } from './fixtures';

test.describe('Myuze product experience', () => {
  test('first-run auth and onboarding reaches the personal stylist', async ({ page }) => {
    await startFresh(page);

    await page.getByLabel('Email').fill('maya@myuze.app');
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await expect(page.getByRole('heading', { name: 'Enter your code.' })).toBeVisible();
    await page.getByLabel('Four-digit code').fill('2468');
    await page.getByRole('button', { name: 'Verify and continue' }).click();

    await expect(page.getByRole('heading', { name: 'Make every suggestion fit.' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'What feels like you?' })).toBeVisible();
    await page.getByRole('button', { name: 'Workwear' }).click();
    await page.getByRole('button', { name: 'Finish profile' }).click();

    await expect(page.getByRole('heading', { name: 'What are you dressing for?' })).toBeVisible();
    await expect(page.getByPlaceholder('Ask Myuze anything…')).toBeVisible();
  });

  test('core journey works from discovery through try-on, challenge, share, and shopping', async ({ page }) => {
    await seedSignedInUser(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Your gallery opening look' })).toBeVisible();
    await page.getByRole('button', { name: 'Shop the look' }).click();
    await expect(page.getByRole('dialog', { name: 'Shop the look' })).toBeVisible();
    await expect(page.getByText('Estimated total')).toBeVisible();
    await page.getByRole('button', { name: 'Prepare shopping list' }).click();
    await expect(page.getByRole('status')).toContainText('Shopping list prepared');

    await page.getByRole('button', { name: 'Challenge' }).click();
    await expect(page.getByRole('dialog', { name: 'Create a challenge' })).toBeVisible();
    await page.getByRole('radio', { name: 'Outfit battle' }).check();
    await page.getByRole('button', { name: 'Create share card' }).click();
    await expect(page.getByRole('dialog', { name: 'Share your look' })).toBeVisible();
    await page.getByRole('button', { name: 'Instagram' }).click();
    await expect(page.getByRole('status')).toContainText('Instagram share is ready');
    await page.getByRole('button', { name: 'Close Share your look' }).click();

    await page.getByTestId('tab-discover').click();
    await expect(page.getByRole('heading', { name: 'Find your next look.' })).toBeVisible();
    await page.getByLabel('Search looks').fill('workwear');
    await expect(page.getByRole('button', { name: /Modern Workwear outfit/ })).toBeVisible();
    await page.getByRole('button', { name: /Modern Workwear outfit/ }).click();
    await expect(page.getByRole('heading', { name: 'Your creative meeting look' })).toBeVisible();
  });

  test('profile, notifications, save state, and keyboard dialog dismissal work', async ({ page }) => {
    await seedSignedInUser(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Saved' }).click();
    await expect(page.getByRole('status')).toContainText('Removed from saved');
    await page.getByRole('button', { name: 'Open notifications' }).click();
    await expect(page.getByRole('dialog', { name: 'Notifications' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Notifications' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('button', { name: /Maya Johnson/ }).click();
    await expect(page.getByRole('dialog', { name: 'Style profile' })).toBeVisible();
    await page.getByLabel('Size').selectOption('L');
    await page.getByRole('button', { name: 'Save profile' }).click();
    await expect(page.getByRole('status')).toContainText('Profile changes saved');
  });
});
