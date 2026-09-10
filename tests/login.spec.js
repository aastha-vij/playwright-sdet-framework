import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../testData/users';

test.describe('Login tests for SauceDemo application', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const loginTestData = [
    {
      user: users.lockedOut,
      expectedErrorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    },
  ];

  for (const data of loginTestData) {
    test(`Locked out user ${data.user.username} cannot login @login @negative`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(data.user.username, data.user.password);
      await expect(loginPage.errorMsg).toBeVisible();
      await loginPage.verifyErrorMessage(data.expectedErrorMessage);

    });
  }

  const validLoginTestData = [
    users.standard,
    users.problem,
  ];

  for (const user of validLoginTestData) {
    test(`Valid user ${user.username} can login @login @positive`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(user.username, user.password);
      await expect(page).toHaveURL(/.*inventory.html/);
    });
  }

});