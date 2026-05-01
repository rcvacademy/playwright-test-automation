import { expect, Page, Locator } from "@playwright/test";
import {readDataFromFile} from '../utils/fileUtils'

export class OrderDetailsPage {
    readonly page: Page;
    readonly orderStatus: Locator;
    readonly orderID: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderStatus = page.locator("#order-detail-status");
        this.orderID = page.locator("#order-detail-heading");

    }

    async checkTheOrderStatus(ordStatus: string) {
        await expect(this.orderStatus).toHaveText(ordStatus);
    }

    async checkTheOrderID(filename: string) {
        const ord = await readDataFromFile(filename);
        const ord_ID = ord.trim();
        await expect(this.orderID).toHaveText(ord_ID);
    }


}