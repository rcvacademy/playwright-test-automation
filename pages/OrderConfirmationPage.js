const { expect } = require("@playwright/test");
class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmTitleText = page.locator("#confirm-title");
        this.orderNumberText = page.locator("#confirm-order-num");
        this.continueShoppingButton = page.locator("#continue-shopping-btn");
        
    }

    async checkIfOrderPlacedSuccessfully(msg){
        await expect(this.confirmTitleText).toHaveText(msg);
    }

    async getOrderID(){
        const orderID = await this.orderNumberText.textContent();
        return orderID;
    }

    async clickOnContinueShoppingButton(){
        await this.continueShoppingButton.click();
    }
}

module.exports = { OrderConfirmationPage };