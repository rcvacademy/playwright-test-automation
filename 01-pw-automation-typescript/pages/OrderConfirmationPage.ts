import { Page, Locator, expect } from '@playwright/test';

export class OrderConfirmationPage {
    readonly page: Page;
    readonly confirmTitleText: Locator;
    readonly orderNumberText: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmTitleText = page.locator("#confirm-title");
        this.orderNumberText = page.locator("#confirm-order-num");
        this.continueShoppingButton = page.locator("#continue-shopping-btn");

    }

    async checkIfOrderPlacedSuccessfully(msg: string) {
        await expect(this.confirmTitleText).toHaveText(msg);
    }

    async getOrderID(): Promise<string> {
        const orderID = await this.orderNumberText.textContent();
        return orderID || '';
    }

    async clickOnContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }
}
