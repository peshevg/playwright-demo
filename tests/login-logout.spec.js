import { test, expect } from '@playwright/test';
import { LoginPage, username, validPassword } from '../support/loginPage';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test('successful login-logout', async ({ page }) => {
    // login
    await loginPage.login(username, validPassword);
    //await page.goto('/');    
    //await page.locator('[data-test="username"]').fill('standard_user');
    //await page.locator('[data-test="password"]').fill('secret_sauce');
    //await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');

    //logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible;
});

test('login with invalid username', async ({ page }) => {
    await loginPage.login('invalid', validPassword);

    await expect(page).toHaveURL('https://www.saucedemo.com');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
