export class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
    }
}