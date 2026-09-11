export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartTitle = page.getByText('Your Cart');
        this.cartItem = page.locator('.cart_item');
    }

    getCartItems() {
        return this.cartItem;
    }

    getProduct(productName) {
        return this.cartItem.filter({
            hasText: productName,
        });
    }

    getProductPrice(productName) {
        return this.getProduct(productName)
            .locator('.inventory_item_price');
    }

    getProductQuantity(productName) {
        return this.getProduct(productName)
            .locator('.cart_quantity');
    }

    getRemoveBtn(productName) {
        return this.getProduct(productName)
            .getByRole('button', { name: 'Remove' });
    }
    async isCartPageVisible() {
        return await this.cartTitle.isVisible();
    }

    async removeProduct(productName) {
        await this.getRemoveBtn(productName).click();
    }
}