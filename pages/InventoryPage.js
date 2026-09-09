import { expect } from '@playwright/test';
import { get } from 'node:http';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.getByText('Products');
        this.backpack = page.locator('.inventory_item').filter({
            hasText: 'Sauce Labs Backpack',
        });
        this.addToCartButton = this.backpack.getByRole('button', { name: 'Add to cart' });
        this.removeButton = this.backpack.getByRole('button', { name: 'Remove' });
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async isProductsPageVisible() {
        return await this.productsTitle.isVisible();
    }

    async addBackpackToCart() {
        await this.addToCartButton.click();
    }

    async isBackpackAddedToCart() {
        return await this.removeButton.isVisible();
    }

    async getCartCount() {
        return await this.shoppingCartBadge.textContent();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

}