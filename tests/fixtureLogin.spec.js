import { test, expect } from './fixtures/loggedInPage.js';

test('Logged in user can access inventory @fixture', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/.*inventory.html/);
    await expect(loggedInPage.getByText('Products')).toBeVisible();
});