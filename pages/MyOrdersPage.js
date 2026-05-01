const { readDataFromFile } = require('../utils/fileUtils');

class MyOrdersPage {
    constructor(page) {
        this.page = page;
        this.orderCardDiv = page.locator(".order-card")

    }

    async clickOnOrderFromFile(filename) {
        const ord = await readDataFromFile(filename);
        const orderID = ord.trim();
        await this.orderCardDiv.filter({ hasText: orderID }).getByRole("link").click();
    }

}

module.exports = { MyOrdersPage };