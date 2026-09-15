import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { users } from '../testData/users.js';

// ENUMS later
const sortOptions = [
    { value: 'az', label: 'Name (A to Z)' },
    { value: 'za', label: 'Name (Z to A)' },
    { value: 'lohi', label: 'Price (low to high)' },
    { value: 'hilo', label: 'Price (high to low)' },
];

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

    for (const option of sortOptions) {
        await inventoryPage.sortProducts(option.value);
        await inventoryPage.isSortOptionSelected(option.label);
    }
});

