class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.phoneTextbox = page.locator("#ship-phone");
        this.shipAddress1 = page.locator("#ship-address1");
        this.shipCity = page.locator("#ship-city");
        this.shipState = page.locator("#ship-state");
        this.shipZipCode = page.locator("#ship-zip");
        this.shipCountry = page.locator("#ship-country");
        this.cardName = page.locator("#card-name");
        this.cardNumber = page.locator("#card-number");
        this.cardExpiry = page.locator("#card-expiry");
        this.cardCVV = page.locator("#card-cvv");
        this.placeOrderButton = page.locator("#place-order-btn");
    }

    async fillPhoneNumber(phoneNumber) {
        await this.phoneTextbox.fill(phoneNumber);
    }

    async fillShipAddress1(shipAddr1) {
        await this.shipAddress1.fill(shipAddr1);
    }

    async fillShipCity(city) {
        await this.shipCity.fill(city);
    }

    async fillShipState(state) {
        await this.shipState.fill(state);
    }

    async fillShipZipCode(zipCode) {
        await this.shipZipCode.fill(zipCode);
    }

    async fillShipCountry(country) {
        await this.shipCountry.selectOption(country);
    }

    async fillCardName(cdName) {
        await this.cardName.fill(cdName);
    }

    async fillCardNumber(cardNum) {
        await this.cardNumber.fill(cardNum);
    }

    async fillCardExpiry(cardExp) {
        await this.cardExpiry.fill(cardExp);
    }

    async fillCardCVV(cdcvv) {
        await this.cardCVV.fill(cdcvv);
    }

    async clickPlaceOrderButton(){
        await this.placeOrderButton.click();
    }

}

module.exports = { CheckoutPage };