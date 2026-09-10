export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.getByText('Products');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }

    getProduct(ProductName) {
        return this.page.locator('.inventory_item').filter({
            hasText: ProductName,
        });
    }

    async addProductToCart(ProductName) {
        await this.getProduct(ProductName).getByRole('button', { name: 'Add to cart' }).click();
    }

    getRemoveBtn(ProductName) {
        return this.getProduct(ProductName).getByRole('button', { name: 'Remove' });
    }

    async removeProductFromCart(ProductName) {
        await this.getRemoveBtn(ProductName).click();
    }

    async isRemoveButtonVisible(ProductName) {
        return this.getRemoveBtn(ProductName).isVisible();
    }

    getProductPrice(ProductName) {
        return this.getProduct(ProductName).locator('.inventory_item_price');
    }

    getProductName(ProductName) {
        return this.getProduct(ProductName).locator('.inventory_item_name');
    }
}