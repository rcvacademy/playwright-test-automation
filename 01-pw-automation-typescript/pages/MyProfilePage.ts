import {Page, Locator, expect} from '@playwright/test';
export class MyProfilePage {

    readonly page: Page;
    readonly phoneNumberTextbox: Locator;
    readonly saveChangesButton: Locator;
    readonly updateProfileSuccessMsgText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.phoneNumberTextbox = page.locator("#profile-phone");
        this.saveChangesButton = page.locator("#save-personal-btn");
        this.updateProfileSuccessMsgText = page.locator("#profile-update-msg");
    }


    async addNewPhoneNumber(pnumber: string) {
        await this.phoneNumberTextbox.fill(pnumber);
    }

    async clickSaveChangesButton() {
        await this.saveChangesButton.click();
    }

    async checkIfTheProfileGotUpdatedSuccessfully(successMsg: string) {
        await expect(this.updateProfileSuccessMsgText).toHaveText(successMsg);
    }


}