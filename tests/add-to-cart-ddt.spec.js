const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage")
const { DashboardPage } = require("../pages/DashboardPage")
const { ProductDetailsPage } = require("../pages/ProductDetailsPage")
const { TopMenuPage } = require("../pages/TopMenuPage")
const { readCSV } = require("../utils/fileUtils")

const testdata = readCSV('testData.csv');

test.describe("Product search test", () => {
    for (const data of testdata) {
        test(`Product search and add to cart with ${data.product}`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            const dashboardPage = new DashboardPage(page);
            const productDetailsPage = new ProductDetailsPage(page);
            const topMenuPage = new TopMenuPage(page);

            // Login using valid credentials - Login is successful 
            await loginPage.openTestApp(process.env.BASE_URL + '/login');
            await loginPage.login(process.env.UNAME, process.env.PASSWORD);

            // Enter product name “Laptops” in search bar - Search bar accepts input 
            await dashboardPage.enterProductNameToSearch(data.product);

            // Click "Search" icon - Relevant products displayed 
            await dashboardPage.clickSearchButton();

            // Validate only searched category products are displayed - Only matching category products are returned 
            await dashboardPage.checkProductList(data.product);

            // Select first product from searched items - Product details page opens 
            await dashboardPage.clickOnFirstProductFromList();

            // Click on "Add to Cart" button - Product should get added to cart
            await productDetailsPage.addProductToCart();
            await productDetailsPage.checkIfProductAddedSuccessfully(data.itemsInCart);

            // Logout from portal - User should get logged out
            await topMenuPage.logoutFromApp();


        })
    }
})
