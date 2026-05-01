const { readDataFromFile } = require('../utils/fileUtils');
const { expect } = require("@playwright/test");

class OrderDetailsPage {
    constructor(page) {
        this.page = page;
        this.orderStatus = page.locator("#order-detail-status");
        this.orderID = page.locator("#order-detail-heading");

    }

    async checkTheOrderStatus(ordStatus) {
        await expect(this.orderStatus).toHaveText(ordStatus);
    }

    async checkTheOrderID(filename) {
        const ord = await readDataFromFile(filename);
        const ord_ID = ord.trim();
        await expect(this.orderID).toHaveText(ord_ID);
    }


}

module.exports = { OrderDetailsPage };