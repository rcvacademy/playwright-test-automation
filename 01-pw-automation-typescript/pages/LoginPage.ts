import {Page, Locator} from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username_field: Locator;
    readonly password_field: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username_field = page.locator("#login-email");
        this.password_field = page.locator("#login-password");
        this.loginButton = page.locator("#login-submit-btn");
    }


    async login(username: string, password: string) {
        await this.username_field.fill(username);
        await this.password_field.fill(password);
        await this.loginButton.click();
    }

    async openTestApp(url: string){
        await this.page.goto(url);
    }

    
}