import { test as base, expect } from '@playwright/test';
import { username, validPassword } from '../support/loginPage';

export const test = base.extend({
  loggedIn: async ({ page }, use) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(validPassword);
    await page.locator('[data-test="login-button"]').click();

    await use(page);
  }
});

export { expect } from '@playwright/test';
