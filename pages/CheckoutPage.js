export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {
            name: 'Continue'
        });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    getProduct(productName) {
        return this.page.locator('.cart_item').filter({
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

    getItemTotal() {
        return this.itemTotal;
    }

    getTax() {
        return this.tax;
    }

    getTotal() {
        return this.total;
    }
}