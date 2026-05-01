class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_field = page.locator("#login-email");
        this.password_field = page.locator("#login-password");
        this.loginButton = page.locator("#login-submit-btn");
    }

    async login(username, password) {
        await this.username_field.fill(username);
        await this.password_field.fill(password);
        await this.loginButton.click();
    }

    async openTestApp(url){
        await this.page.goto(url);
    }

    
}

module.exports = { LoginPage };