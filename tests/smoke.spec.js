import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../testData/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

const user = users.standard;

test('User can add multiple products to the cart @smoke @products', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');

  await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

  await expect(
    inventoryPage.getProductPrice('Sauce Labs Backpack')
  ).toHaveText('$29.99');

  await expect(
    inventoryPage.getProductPrice('Sauce Labs Bike Light')
  ).toHaveText('$9.99');
});

test('User can remove a product from the cart @smoke @products', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.removeProductFromCart('Sauce Labs Backpack');

  await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

  await expect(
    inventoryPage.getProductPrice('Sauce Labs Backpack')
  ).toHaveText('$29.99');
});

test('User can open product details @smoke @products', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.getProductName('Sauce Labs Backpack').click();

  await expect(page).toHaveURL(/.*inventory-item.html/);
});

test('User can verify product details @smoke @products', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.getProductName('Sauce Labs Backpack').click();

  await expect(page).toHaveURL(/.*inventory-item.html/);

  await expect(productDetailsPage.productName)
    .toHaveText('Sauce Labs Backpack');

  await expect(productDetailsPage.productPrice)
    .toHaveText('$29.99');
});

test('User can add a product to the cart @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
  await loginPage.login(user.username, user.password);
  await expect(page).toHaveURL(/.*inventory.html/);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  expect(await inventoryPage.isRemoveButtonVisible('Sauce Labs Backpack')).toBe(true);
  await expect(inventoryPage.getProductName('Sauce Labs Backpack')).toHaveText('Sauce Labs Backpack');
  await expect(inventoryPage.getProductPrice('Sauce Labs Backpack')).toHaveText('$29.99');

  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/.*cart.html/);

  await expect(cartPage.cartTitle).toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).toBeVisible();

  await expect(
    cartPage.getProductPrice('Sauce Labs Backpack')
  ).toHaveText('$29.99');

  await expect(
    cartPage.getProductQuantity('Sauce Labs Backpack')
  ).toHaveText('1');
});

test('User can verify multiple products in cart @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');

  await inventoryPage.goToCart();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(cartPage.cartTitle).toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Bike Light')
  ).toBeVisible();

  await expect(
    cartPage.getProductPrice('Sauce Labs Backpack')
  ).toHaveText('$29.99');

  await expect(
    cartPage.getProductPrice('Sauce Labs Bike Light')
  ).toHaveText('$9.99');

  await expect(
    cartPage.getProductQuantity('Sauce Labs Backpack')
  ).toHaveText('1');

  await expect(
    cartPage.getProductQuantity('Sauce Labs Bike Light')
  ).toHaveText('1');
});

test('Cart displays correct number of products @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');

  await inventoryPage.goToCart();

  await expect(cartPage.cartTitle).toBeVisible();

  await expect(cartPage.getCartItems()).toHaveCount(2);
});

test('User can remove a product from cart @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');

  await inventoryPage.goToCart();

  await expect(cartPage.cartTitle).toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).toBeVisible();

  await cartPage.removeProduct('Sauce Labs Backpack');
  await expect(cartPage.getCartItems()).toHaveCount(1);

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).not.toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Bike Light')
  ).toBeVisible();
});

test('Cart becomes empty after removing the only product @smoke @cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  await inventoryPage.goToCart();

  await expect(cartPage.cartTitle).toBeVisible();

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).toBeVisible();

  await cartPage.removeProduct('Sauce Labs Backpack');

  await expect(
    cartPage.getProduct('Sauce Labs Backpack')
  ).not.toBeVisible();

  await expect(cartPage.getCartItems()).toHaveCount(0);
});