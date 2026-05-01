const { test } = require("@playwright/test");
const { TopMenuPage } = require("../pages/TopMenuPage")
const { LoginPage } = require("../pages/LoginPage")
const { ShoppingCart } = require("../pages/ShoppingCart")
const { CheckoutPage } = require("../pages/CheckoutPage")
const { OrderConfirmationPage } = require("../pages/OrderConfirmationPage")
const {writeDataToFile} = require("../utils/fileUtils");

test("@smoke Checkout and Payment", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const topMenuPage = new TopMenuPage(page);
    const shoppingCart = new ShoppingCart(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    // User has at least one product in cart
    await loginPage.openTestApp("http://localhost:3000/store/login");
    await loginPage.login("rcvtutorials@gmail.com", "testing123")

    // Go to cart - Cart page displays selected items
    await topMenuPage.clickOnCartIcon();

    // Click "Proceed to Checkout" - Checkout page opens
    await shoppingCart.clickOnCheckoutButton();

    // Enter shipping details - Shipping details accepted
    await checkoutPage.fillPhoneNumber("1234567890");
    await checkoutPage.fillShipAddress1("Sample address");
    await checkoutPage.fillShipCity("Melbourne");
    await checkoutPage.fillShipState("VIC");
    await checkoutPage.fillShipZipCode("3000");
    await checkoutPage.fillShipCountry("AU")

    // Select payment method and enter payment details - Payment method selected
    await checkoutPage.fillCardName("RCV");
    await checkoutPage.fillCardNumber("1234456789012345");
    await checkoutPage.fillCardExpiry("11/28");
    await checkoutPage.fillCardCVV("123");

    // Click on “Place Order” button - Order confirmation page with order ID displayed   
    await checkoutPage.clickPlaceOrderButton();
    await orderConfirmationPage.checkIfOrderPlacedSuccessfully("Order Placed Successfully!");
    const orderid = await orderConfirmationPage.getOrderID();
    await writeDataToFile('orders.txt', orderid);

    // Click on “Continue Shopping” button - User redirected to home page
    await orderConfirmationPage.clickOnContinueShoppingButton();

    // Logout from portal - User should get logged out
    await topMenuPage.logoutFromApp();

})