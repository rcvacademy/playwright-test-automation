import { Page, Locator } from '@playwright/test';
import {readDataFromFile} from '../utils/fileUtils';

export class MyOrdersPage {
    readonly page: Page;
    readonly orderCardDiv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderCardDiv = page.locator(".order-card")

    }

    async clickOnOrderFromFile(filename: string) {
        const ord = await readDataFromFile(filename);
        const orderID = ord.trim();
        await this.orderCardDiv.filter({ hasText: orderID }).getByRole("link").click();
    }

}