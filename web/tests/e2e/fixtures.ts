import type { Page } from '@playwright/test';

export const storeKey = 'myuze-polished-prototype-v2';

export const signedInState = {
  signedIn: true,
  onboardingComplete: true,
  profile: {
    fullName: 'Maya Johnson',
    email: 'maya@myuze.app',
    gender: 'Male',
    size: 'M',
    styles: ['Streetwear', 'Minimal'],
  },
  savedLookIds: ['soft-street', 'quiet-luxury'],
  tryOnHistory: ['soft-street'],
  chat: [{ id: 'welcome', role: 'assistant', text: 'Tell me what you are dressing for.' }],
};

export async function seedState(page: Page, overrides: Record<string, unknown> = {}) {
  await page.addInitScript(
    ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
    { key: storeKey, value: { ...signedInState, ...overrides } },
  );
}

export async function seedSignedInUser(page: Page) {
  await seedState(page);
}

export async function startFresh(page: Page) {
  await seedState(page, { signedIn: false, onboardingComplete: false });
  await page.goto('/');
}
