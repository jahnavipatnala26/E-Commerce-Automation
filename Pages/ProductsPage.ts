import { Page, Locator } from '@playwright/test';

export class ProductsPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productItems: Locator;
    readonly sortDropdown: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartLink = page.locator('.shopping_cart_link');

    }

    async verifyProductsPage() {

        await this.pageTitle.waitFor();

    }

    async getProductCount() {

        return await this.productItems.count();

    }

    async sortProducts(option: string) {

        await this.sortDropdown.selectOption(option);

    }

    async addProductToCart(productName: string) {

        const product = this.productItems.filter({
            hasText: productName
        });

        await product.locator('button').click();

    }

    async openCart() {

        await this.cartLink.click();

    }
}