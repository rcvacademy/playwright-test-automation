import {Page, Locator} from '@playwright/test';
export class CheckoutPage {

    readonly page: Page;
    readonly phoneTextbox: Locator;
    readonly shipAddress1: Locator;
    readonly shipCity: Locator;
    readonly shipState: Locator;
    readonly shipZipCode: Locator;
    readonly shipCountry: Locator;
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly cardExpiry: Locator;
    readonly cardCVV: Locator;
    readonly placeOrderButton: Locator;


    constructor(page: Page) {
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

    async fillPhoneNumber(phoneNumber: string) {
        await this.phoneTextbox.fill(phoneNumber);
    }

    async fillShipAddress1(shipAddr1: string) {
        await this.shipAddress1.fill(shipAddr1);
    }

    async fillShipCity(city: string) {
        await this.shipCity.fill(city);
    }

    async fillShipState(state: string) {
        await this.shipState.fill(state);
    }

    async fillShipZipCode(zipCode: string) {
        await this.shipZipCode.fill(zipCode);
    }

    async fillShipCountry(country: string) {
        await this.shipCountry.selectOption(country);
    }

    async fillCardName(cdName: string) {
        await this.cardName.fill(cdName);
    }

    async fillCardNumber(cardNum: string) {
        await this.cardNumber.fill(cardNum);
    }

    async fillCardExpiry(cardExp: string) {
        await this.cardExpiry.fill(cardExp);
    }

    async fillCardCVV(cdcvv: string) {
        await this.cardCVV.fill(cdcvv);
    }

    async clickPlaceOrderButton(){
        await this.placeOrderButton.click();
    }

}