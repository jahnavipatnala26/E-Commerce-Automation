import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('SauceDemo Product Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.goto();

        await loginPage.login('standard_user', 'secret_sauce');

        await productsPage.verifyProductsPage();

    });

    test('Verify product listing', async () => {

        const count = await productsPage.getProductCount();

        expect(count).toBe(6);

    });

    test('Verify product sorting', async () => {

        await productsPage.sortProducts('az');

        await expect(productsPage.sortDropdown).toHaveValue('az');

    });

    test('Verify adding product to cart', async ({ page }) => {

        await productsPage.addProductToCart('Sauce Labs Backpack');

        await expect(page.locator('.shopping_cart_badge'))
            .toHaveText('1');

    });

});