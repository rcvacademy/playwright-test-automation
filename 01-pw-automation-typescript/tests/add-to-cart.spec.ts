import { test } from '@playwright/test';
import { TopMenuPage } from '../pages/TopMenuPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { readCSV } from '../utils/fileUtils';

test("Product search and add to cart", { tag: ['@reg', '@smoke'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const topMenuPage = new TopMenuPage(page);

    const testURL = process.env.BASE_URL ?? '';
    const uname = process.env.UNAME ?? '';
    const password = process.env.PASSWORD ?? '';

    interface ProductData {
        product: string;
        itemsInCart: string;
    }

    // const td = await readCSV('testData.csv');
    const td = readCSV<ProductData>('testData.csv');
    console.log(td);
    const { product, itemsInCart } = td[0];

    // Login using valid credentials - Login is successful 
    await loginPage.openTestApp(testURL + '/login');
    await loginPage.login(uname, password);

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