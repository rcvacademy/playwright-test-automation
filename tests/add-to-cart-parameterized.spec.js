const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { DashboardPage } = require("../pages/DashboardPage");
const { ProductDetailsPage } = require("../pages/ProductDetailsPage");
const { TopMenuPage } = require("../pages/TopMenuPage");

[
    { product: 'Accessories', itemsInCart: '1' },
    { product: 'Laptops', itemsInCart: '2' }
].forEach(({ product, itemsInCart }) => {
    test(`Product search and add to cart with ${product}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const topMenuPage = new TopMenuPage(page);

        // Login using valid credentials - Login is successful 
        await loginPage.openTestApp(process.env.BASE_URL + '/login');
        await loginPage.login(process.env.UNAME, process.env.PASSWORD);

        // Enter product name “Laptops” in search bar - Search bar accepts input 
        await dashboardPage.enterProductNameToSearch(product);

        // Click "Search" icon - Relevant products displayed 
        await dashboardPage.clickSearchButton();

        // Validate only searched category products are displayed - Only matching category products are returned 
        await dashboardPage.checkProductList(product);

        // Select first product from searched items - Product details page opens 
        await dashboardPage.clickOnFirstProductFromList();

        // Click on "Add to Cart" button - Product should get added to cart
        await productDetailsPage.addProductToCart();
        await productDetailsPage.checkIfProductAddedSuccessfully(itemsInCart);

        // Logout from portal - User should get logged out
        await topMenuPage.logoutFromApp();
    });
});

