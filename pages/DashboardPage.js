const { expect } = require("@playwright/test");
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.searchbarTextbox = page.locator("#store-search-input");
        this.searchIcon = page.locator("#store-search-btn");
        this.searchedProductNames = page.locator(".product-name");
        this.productCategory = page.locator(".product-category");
    }

    async enterProductNameToSearch(productName) {
        await this.searchbarTextbox.fill(productName);
    }

    async clickSearchButton() {
        await this.searchIcon.click();
    }

    async checkProductList(productName) {
        for (const category of await this.productCategory.all()) {
            await expect(category).toHaveText(productName);
        }
    }

    async clickOnFirstProductFromList(){
        await this.searchedProductNames.first().click();
    }

}

module.exports = { DashboardPage };