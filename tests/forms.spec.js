import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { users } from '../testData/users.js';

test('User can sort products by price @forms @dropdown', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto('/');

    await loginPage.login(
        users.standard.username,
        users.standard.password
    );

    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.isSortOptionSelected('Name (A to Z)');

    await inventoryPage.sortProducts('lohi');
    await inventoryPage.isSortOptionSelected('Price (low to high)');
});

