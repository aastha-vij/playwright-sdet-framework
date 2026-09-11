import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../testData/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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

test('User can open checkout page @smoke @checkout', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/');
  await loginPage.login(user.username, user.password);

  await expect(inventoryPage.productsTitle).toBeVisible();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  await inventoryPage.goToCart();

  await expect(cartPage.cartTitle).toBeVisible();

  await cartPage.goToCheckout();

  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await expect(checkoutPage.firstNameInput).toBeVisible();
  await expect(checkoutPage.lastNameInput).toBeVisible();
  await expect(checkoutPage.postalCodeInput).toBeVisible();

  await checkoutPage.fillCheckoutInformation(
    'Test',
    'User',
    '141001'
  );

  await expect(checkoutPage.firstNameInput).toHaveValue('Test');
  await expect(checkoutPage.lastNameInput).toHaveValue('User');
  await expect(checkoutPage.postalCodeInput).toHaveValue('141001');

  await checkoutPage.continueToOverview();

  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

  await expect(
    checkoutPage.getProduct('Sauce Labs Backpack')
  ).toBeVisible();

  await expect(
    checkoutPage.getProductPrice('Sauce Labs Backpack')
  ).toHaveText('$29.99');

  await expect(
    checkoutPage.getProductQuantity('Sauce Labs Backpack')
  ).toHaveText('1');

  const itemTotalText = await checkoutPage.getItemTotal().innerText();
  const taxText = await checkoutPage.getTax().innerText();
  const totalText = await checkoutPage.getTotal().innerText();

  const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
  const tax = parseFloat(taxText.replace('Tax: $', ''));
  const total = parseFloat(totalText.replace('Total: $', ''));

  expect(itemTotal + tax).toBeCloseTo(total, 2);

  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL(/.*checkout-complete.html/);

  await expect(checkoutPage.completeHeader).toBeVisible();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

  await expect(checkoutPage.backHomeButton).toBeVisible();
  await checkoutPage.backHomeButton.click();
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(inventoryPage.productsTitle).toBeVisible();
});