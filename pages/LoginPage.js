import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isErrorMessageVisible() {
        return await this.errorMsg.isVisible();
    }

    async verifyErrorMessage(message) {
        await expect(this.errorMsg).toHaveText(message);
    }
}