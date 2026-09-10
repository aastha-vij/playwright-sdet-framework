export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartTitle = page.getByText('Your Cart');
        this.backpack = page.locator('.cart_item').filter({
            hasText: 'Sauce Labs Backpack',
        });
    }
}