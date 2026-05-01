const { test } = require("@playwright/test");
const { TopMenuPage } = require("../pages/TopMenuPage")
const { LoginPage } = require("../pages/LoginPage")
const { MyProfilePage } = require("../pages/MyProfilePage")

test("Update personal information", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const topMenuPage = new TopMenuPage(page);
    const myProfilePage = new MyProfilePage(page);

    // Log in to eCommerce portal - Login should be successful
    await loginPage.openTestApp("http://localhost:3000/store/login");
    await loginPage.login("rcvtutorials@gmail.com", "testing123");

    // Click on “User → My profile” - “Personal Information” page opens
    await topMenuPage.clickProfileIcon();
    await topMenuPage.clickOnMyProfileLink();

    // Update few details in personal information page and click “Save Changes” - Personal information should get saved successfully
    await myProfilePage.addNewPhoneNumber("675463475");
    await myProfilePage.clickSaveChangesButton();
    await myProfilePage.checkIfTheProfileGotUpdatedSuccessfully("Personal information updated successfully.");
    
    // Click on “Sign out” - User should get logged off
    topMenuPage.logoutFromApp();

})