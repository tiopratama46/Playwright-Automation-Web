export class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameField = '#user-name';
    this.passwordField = '#password';
    this.loginButton = '#login-button';
    this.productTitle = '.title';
    this.errorMessage = '[data-test="error"]';

  }
  
  async gotoLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async inputUsername(username) {
    await this.page.locator(this.usernameField).fill(username);
  }

  async inputPassword(password) {
    await this.page.locator(this.passwordField).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  async login(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }

  getErrorMessage() {
    return this.page.locator(this.errorMessage);
  }
}