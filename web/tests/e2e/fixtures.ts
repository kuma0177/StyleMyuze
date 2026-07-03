import { expect, type Page } from '@playwright/test';

export const storeKey = 'myuze-pwa-prototype-v1';

export const seededStore = {
  activeTenantId: 'myuze-studio',
  activeUserId: 'maya',
  tenants: {
    'myuze-studio': {
      id: 'myuze-studio',
      name: 'Myuze Studio',
      users: {
        maya: {
          id: 'maya',
          name: 'Maya Johnson',
          email: 'maya@myuze.app',
          setupStep: 'done',
          profile: {
            fullName: 'Maya Johnson',
            gender: 'Female',
            skinTone: 'Medium',
            size: 'M',
            styles: ['Streetwear', 'Soft Minimal'],
            influencers: [],
            inspirationLinks: [],
          },
          chat: [
            {
              id: 'seed-assistant',
              role: 'assistant',
              text: 'Hi Maya. Drop a screenshot, link, product, or vibe and I will turn it into fits that remember your style twin.',
            },
          ],
          savedLooks: ['soft-street'],
          tryOnHistory: ['rooftop-casual'],
          polls: [],
        },
      },
    },
  },
};

export async function seedSignedInUser(page: Page) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: storeKey, value: seededStore },
  );
}

export async function startFresh(page: Page) {
  await page.goto('/');
  await page.evaluate(key => window.localStorage.removeItem(key), storeKey);
  await page.reload();
}

export async function expectNoDebugTenantMenu(page: Page) {
  await expect(page.getByText('Tenant and user memory')).toHaveCount(0);
  await expect(page.getByText('Campus Drop')).toHaveCount(0);
  await expect(page.getByText(/chat memories/i)).toHaveCount(0);
}
