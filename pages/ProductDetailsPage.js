const { expect } = require("@playwright/test");
class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator("#detail-add-cart-btn");
        this.pageCart = page.locator("#cart-badge");
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async checkIfProductAddedSuccessfully(number) {
        expect(await this.pageCart).toHaveText(number);
    }

}

module.exports = { ProductDetailsPage };