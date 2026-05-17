import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page.js';
import { CartPage } from './pages/cart.page.js';
import dotenv from 'dotenv';
dotenv.config();

test('Add to Cart Product', async ({ page }) => {

    //Login with valid username and password
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(
        process.env.USERNAME,
        process.env.PASSWORD
    );

    //Verify user redirected to inventory page
    await expect(page).toHaveURL(/inventory.html/);

    //Click item to cart product
    const cartPage = new CartPage(page);
    await cartPage.clickItem();

    //Click add to cart button
    await cartPage.clickAddToCart();

    //Cart page
    await cartPage.clickCartLink();
    await expect(page.locator(cartPage.productName)).toHaveText('Sauce Labs Backpack');
    
   //Verify Quantity product is 1
   await expect(cartPage.getQuantity()).toHaveText('1');


  // --------------------- Checkout Product --------------------- //

    //Click checkout button
    await cartPage.checkoutProduct();

    //Fill in checkout information
    await cartPage.fillCheckoutInformation();

//--------------------Verify checkout overview page-----------------//
    //Verify user redirected to checkout overview page
   await expect(cartPage.verifyCheckoutOverviewPage()).toHaveText('Checkout: Overview');

    //Verify total price
    await expect(cartPage.getPriceTotalText()).toContainText('Total:');

    //Click finish button
    await cartPage.clickFinishButton();

    //Verify checkout complete text
    await expect(cartPage.getCheckoutCompleteText()).toHaveText('Thank you for your order!');

    //Click back home button
    await cartPage.clickBackHomeButton();

    //Verify user redirected to inventory page
    await expect(page).toHaveURL(/inventory.html/);

});
