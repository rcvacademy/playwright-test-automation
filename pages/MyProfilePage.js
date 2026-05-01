const { expect } = require("@playwright/test");
class MyProfilePage {
    constructor(page) {
        this.page = page;
        this.phoneNumberTextbox = page.locator("#profile-phone");
        this.saveChangesButton = page.locator("#save-personal-btn");
        this.updateProfileSuccessMsgText = page.locator("#profile-update-msg");
    }


    async addNewPhoneNumber(pnumber) {
        await this.phoneNumberTextbox.fill(pnumber);
    }

    async clickSaveChangesButton() {
        await this.saveChangesButton.click();
    }

    async checkIfTheProfileGotUpdatedSuccessfully(successMsg) {
        await expect(this.updateProfileSuccessMsgText).toHaveText(successMsg);
    }


}

module.exports = { MyProfilePage };