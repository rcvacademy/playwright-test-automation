import {test} from '@playwright/test';
import {TopMenuPage} from '../pages/TopMenuPage';
import {LoginPage} from '../pages/LoginPage';
import {MyOrdersPage} from '../pages/MyOrdersPage';
import {OrderDetailsPage} from '../pages/OrderDetailsPage';
import {MyProfilePage} from '../pages/MyProfilePage';

// test.describe.configure({mode: 'serial'});
test.describe.serial("Serial tests", () =>{
test("Order history and tracking", async ({ page }) => {

    const loginPage = new LoginPage(page);
    const topMenuPage = new TopMenuPage(page);
    const myOrdersPage = new MyOrdersPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    // Log in to eCommerce portal - Login should be successful
    await loginPage.openTestApp("http://localhost:3000/store/login");
    await loginPage.login("rcvtutorials@gmail.com", "testing123")

    // Click on “Orders” - “My orders” page opens
    await topMenuPage.clickOnMyOrdersLink();

    // Click “View Details” on order that has been placed by user - Order details displayed
    await myOrdersPage.clickOnOrderFromFile('orders.txt');

    // Verify order tracking displays “Processing” - Tracking information is displayed
    await orderDetailsPage.checkTheOrderStatus("processing");
    await orderDetailsPage.checkTheOrderID("orders.txt");

    // Logout from portal - User should get logged out
    await topMenuPage.logoutFromApp();
})

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
})
