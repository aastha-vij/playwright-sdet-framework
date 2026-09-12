import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../testData/users.js';

export const test = base.extend({
    appPage: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await use(page);
    },
});

export { expect } from '@playwright/test';