import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo Checkout Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();

        await loginPage.login('standard_user', 'secret_sauce');

        await productsPage.addProductToCart('Sauce Labs Backpack');

        await productsPage.openCart();

        await cartPage.checkout();

    });

    test('Verify checkout information page', async ({ page }) => {

        await expect(page).toHaveURL(/checkout-step-one.html/);

        await expect(
            page.locator('.title')
        ).toHaveText('Checkout: Your Information');

    });

    test('Verify empty customer information validation', async () => {

        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessage)
            .toContainText('First Name is required');

    });

    test('Verify successful order checkout', async ({ page }) => {

        await checkoutPage.fillCustomerDetails(
            'Jahnavi',
            'Patnala',
            '500001'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');

        await checkoutPage.finishCheckout();

        await expect(page).toHaveURL(/checkout-complete.html/);

        await expect(checkoutPage.successMessage)
            .toHaveText('Thank you for your order!');

    });

});