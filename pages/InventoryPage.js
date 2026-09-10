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

    async addBackpackToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

}