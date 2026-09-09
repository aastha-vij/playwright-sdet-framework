import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('User can add a product to the cart @smoke', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory.html/);

  expect(await inventoryPage.isProductsPageVisible()).toBe(true);

  await inventoryPage.addBackpackToCart();
  expect(await inventoryPage.isBackpackAddedToCart()).toBe(true);

  expect(await inventoryPage.getCartCount()).toBe('1');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);

  expect(await cartPage.isCartPageVisible()).toBe(true);
  expect(await cartPage.isBackpackInCart()).toBe(true);
});