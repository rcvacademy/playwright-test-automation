import { expect, Page, Locator } from "@playwright/test";
export class ProductDetailsPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly pageCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator("#detail-add-cart-btn");
        this.pageCart = page.locator("#cart-badge");
    }

    async addProductToCart() {
        await this.addToCartButton.click();
    }

    async checkIfProductAddedSuccessfully(number: string) {
        expect(await this.pageCart).toHaveText(number);
    }

}
