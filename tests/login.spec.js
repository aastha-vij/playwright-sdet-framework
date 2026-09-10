import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../testData/users';

const loginTestData = [
    {
        user: users.lockedOut,
        expectedErrorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    },
];

for (const data of loginTestData) {
test('Locked out user cannot login @login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(data.user.username, data.user.password);
    expect(await loginPage.isErrorMessageVisible()).toBe(true);
    await loginPage.verifyErrorMessage(data.expectedErrorMessage);

});
}

const validLoginTestData = [
  users.standard,
  users.problem,
  users.performance,
];

for (const user of validLoginTestData) {
  test(`Valid user ${user.username} can login @login`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login(user.username, user.password);

    await expect(page).toHaveURL(/.*inventory.html/);
  });
}