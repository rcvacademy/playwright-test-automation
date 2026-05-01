import {expect, Page, Locator} from '@playwright/test';
export class DashboardPage {

    readonly page: Page;
    readonly searchbarTextbox: Locator;
    readonly searchIcon: Locator;
    readonly searchedProductNames: Locator;
    readonly productCategory: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchbarTextbox = page.locator("#store-search-input");
        this.searchIcon = page.locator("#store-search-btn");
        this.searchedProductNames = page.locator(".product-name");
        this.productCategory = page.locator(".product-category");
    }

    async enterProductNameToSearch(productName: string) {
        await this.searchbarTextbox.fill(productName);
    }

    async clickSearchButton() {
        await this.searchIcon.click();
    }

    async checkProductList(productName: string) {
        for (const category of await this.productCategory.all()) {
            await expect(category).toHaveText(productName);
        }
    }

    async clickOnFirstProductFromList(){
        await this.searchedProductNames.first().click();
    }

}
