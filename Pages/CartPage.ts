import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartItems: Locator;
    readonly cartTitle: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.cartItems = page.locator('.cart_item');
        this.cartTitle = page.locator('.title');
        this.checkoutButton = page.locator('[data-test="checkout"]');

    }

    async verifyCartPage() {

        await this.cartTitle.waitFor();

    }

    async getCartItemCount() {

        return await this.cartItems.count();

    }

    async removeProduct(productName: string) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.locator('button').click();

    }

    async checkout() {

        await this.checkoutButton.click();

    }
}