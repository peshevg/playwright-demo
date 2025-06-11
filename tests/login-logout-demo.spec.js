import { test, expect } from '@playwright/test';
import { LoginPage, username, validPassword } from '../support/loginPage';

test('successful login-logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // login
    await loginPage.login(username, validPassword);
    //await page.goto('/');    
    //await page.locator('[data-test="username"]').fill('standard_user');
    //await page.locator('[data-test="password"]').fill('secret_sauce');
    //await page.locator('[data-test="login-button"]').click();

    //await expect(page).toHaveScreenshot('loginpage.png');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveTitle('Swag Labs');
    //await expect(page).toHaveScreenshot('homepage.png');

    //logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible;
});
