import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from './pages/login.page.js';
import { credential } from './data/credential.js';
import { users } from './data/login.data.js';
import { log } from 'node:console';

// Grouping all login test scenarios
test.describe('Login Feature', () => {

   // Loop all users from login.data.js
  users.forEach((user) => {

    // Create dynamic test based on username
    test(`Login with ${user.username}`, async ({ page }) => {

       // Initialize Login Page Object
      const loginPage = new LoginPage(page);

      // Direct to Login Page
      await loginPage.gotoLoginPage();

      // Login with Username and Password from login.data.js
      await loginPage.login(
        user.username,
        user.password
      );

        // Success Login Validation
        if (user.expected === 'success') {

        // Verify user redirected to inventory page
        await expect(page).toHaveURL(/inventory.html/);

        // Verify Product page title is displayed
        await expect(page.locator('.title')).toHaveText('Products');
      }

      // Failed Login Validation
      else {

      // Get Error Message Locator
        const errorMessage =
          loginPage.getErrorMessage();

      // Verify error message visible
        await expect(errorMessage)
          .toBeVisible();
          
      // Verify correct error message is displayed
        await expect(
        loginPage.getErrorMessage()
        ).toHaveText(user.errorMessage);

      }

  });

  });

});