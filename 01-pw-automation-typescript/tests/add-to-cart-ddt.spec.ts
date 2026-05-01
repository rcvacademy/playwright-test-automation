import {test} from '@playwright/test';
import {TopMenuPage} from '../pages/TopMenuPage';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import {ProductDetailsPage} from '../pages/ProductDetailsPage';
import {readCSV} from '../utils/fileUtils';

interface ProductData {
    product: string;
    itemsInCart: string;
}

const testdata = readCSV<ProductData>('testData.csv');

test.describe("Product search test", () => {
    for (const data of testdata) {
        test(`Product search and add to cart with ${data.product}`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            const dashboardPage = new DashboardPage(page);
            const productDetailsPage = new ProductDetailsPage(page);
            const topMenuPage = new TopMenuPage(page);

            const testURL = process.env.BASE_URL ?? '';
            const uname = process.env.UNAME ?? '';
            const password = process.env.PASSWORD ?? '';


            // Login using valid credentials - Login is successful 
            await loginPage.openTestApp(testURL + '/login');
            await loginPage.login(uname, password)
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
