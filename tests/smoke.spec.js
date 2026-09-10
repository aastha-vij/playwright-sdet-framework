import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../testData/users';

const user = users.standard;
test('User can add a product to the cart @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
  await loginPage.login(user.username, user.password);
  await expect(page).toHaveURL(/.*inventory.html/);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addBackpackToCart();
  await expect(inventoryPage.removeButton).toBeVisible();

  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);

  await expect(cartPage.cartTitle).toBeVisible();
  await expect(cartPage.backpack).toBeVisible();
});