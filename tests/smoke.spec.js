import { test, expect } from '@playwright/test';

test('SauceDemo application is accessible @smoke', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();

  const backpack = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Backpack',
  });

  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  await expect(
    backpack.getByRole('button', { name: 'Remove' })
  ).toBeVisible();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/.*cart.html/);
  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

});

test('SauceDemo application selectors', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').fill('standard_user');

  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();

  // CSS
  await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();

  // xpath
  await expect(page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

  const cartButtons = page.getByRole('button', { name: 'Add to cart' });
  await expect(cartButtons).toHaveCount(6);

  // Role -> fails (6 elements found) - use locator instead
  //await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible(); 


  //chaining
  const backpack = page.locator('.inventory_item').filter({ has: page.getByRole('link', { name: 'Sauce Labs Backpack' }) });
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); //exact match
  await expect(page.locator('.shopping_cart_badge')).toContainText('1'); //contains
});