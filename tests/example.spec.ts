import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await loginPage.goto();

    });

    test('Valid login', async ({ page }) => {

        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory.html/);

        await expect(page.locator('.title'))
            .toHaveText('Products');

    });

    test('Invalid password', async () => {

        await loginPage.login('standard_user', 'wrong_password');

        await expect(loginPage.errorMessage).toBeVisible();

    });

    test('Empty username', async () => {

        await loginPage.login('', 'secret_sauce');

        await expect(loginPage.errorMessage)
            .toContainText('Username is required');

    });

    test('Empty password', async () => {

        await loginPage.login('standard_user', '');

        await expect(loginPage.errorMessage)
            .toContainText('Password is required');

    });

});