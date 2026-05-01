import { Page, Locator } from "@playwright/test";
export class ShoppingCart {
    readonly page:Page;
    readonly checkoutButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator("#proceed-to-checkout-btn");

    }
    
    async clickOnCheckoutButton() {
        await this.checkoutButton.click();
    }
}