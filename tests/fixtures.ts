import { test as base, expect } from '@playwright/test';
import { welcomeStorageKey } from '../src/config/site';

// Portfolio tests exercise a returning visitor; welcome.spec.ts covers first arrival.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(key => sessionStorage.setItem(key, '1'), welcomeStorageKey);
    await use(page);
  },
});
export { expect };
