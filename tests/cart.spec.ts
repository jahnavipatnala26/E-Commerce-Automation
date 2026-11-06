import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('SauceDemo Cart Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();

        await loginPage.login('standard_user', 'secret_sauce');

        await productsPage.addProductToCart('Sauce Labs Backpack');

        await productsPage.openCart();

        await cartPage.verifyCartPage();

    });

    test('Verify product appears in cart', async () => {

        expect(await cartPage.getCartItemCount()).toBe(1);

    });

    test('Verify product name in cart', async ({ page }) => {

        await expect(page.locator('.inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');

    });

    test('Verify removing product from cart', async () => {

        await cartPage.removeProduct('Sauce Labs Backpack');

        expect(await cartPage.getCartItemCount()).toBe(0);

    });

    test('Verify checkout button', async () => {

        await expect(cartPage.checkoutButton).toBeVisible();

    });

});