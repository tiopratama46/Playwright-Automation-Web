export class CartPage {
    constructor(page) {
    this.page = page;

    //Cart
    this.productName ='[data-test="inventory-item-name"]';
    this.addToCartButton = '[data-test="add-to-cart"]';
    this.cartLink = '[data-test="shopping-cart-link"]';
    this.quantity = '[data-test="item-quantity"]';

    //Checkout
    this.checkoutButton = '[data-test="checkout"]';
    this.firstNameField = '#first-name';
    this.lastNameField = '#last-name';
    this.postalCodeField = '#postal-code';
    this.continueButton = '[data-test="continue"]';

    //Checkout Overview
    this.verifyCheckoutOverviewText = '[data-test="title"]';
    this.priceTotalText = '[data-test="total-label"]';
    this.finishButton = '#finish';
    this.checkoutCompleteText = '[data-test="complete-header"]';
    this.backHomeButton = '#back-to-products';
   
    //----------------- Methods for Cart Page ------------------ //

    }
    //Add Item to Cart
    async clickItem() {
    await this.page.locator(this.productName).first().click();
    }

    //Add to Cart Button
    async clickAddToCart() {
    await this.page.locator(this.addToCartButton).click();
    }
    
    //Add to Cart Link
    async clickCartLink() {
    await this.page.locator(this.cartLink).click();
    }

    //Checkout Button
    async clickCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
    }

    //Quantity Product
    getQuantity() {
    return this.page.locator(this.quantity);
    }

    // --------------------- Checkout Product --------------------- //

    async checkoutProduct() {
    await this.clickCheckoutButton();
    }
    // Fill in checkout information

    async fillCheckoutInformation() {
   ;
    await this.page.locator(this.firstNameField).fill('John');
    await this.page.locator(this.lastNameField).fill('Doe');
    await this.page.locator(this.postalCodeField).fill('12345');
    await this.page.locator(this.continueButton).click();
    }

    //Checkout Overview Page
    verifyCheckoutOverviewPage() {
    return this.page.locator(this.verifyCheckoutOverviewText);
    }

    //Verify Total Price text
    getPriceTotalText() {
    return this.page.locator(this.priceTotalText);
    }

    //Click Finish Button
    async clickFinishButton() {
    await this.page.locator(this.finishButton).click();
    }


   //Verify Checkout Complete Text
    getCheckoutCompleteText() {
    return this.page.locator(this.checkoutCompleteText);
    }

    //----------------- End of Cart Page Methods ------------------ //

    //Click Back Home Button
    async clickBackHomeButton() {
    await this.page.locator(this.backHomeButton).click();
    }
}