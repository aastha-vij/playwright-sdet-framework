import { test, expect } from '@playwright/test';

test('SauceDemo application is accessible @smoke', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});