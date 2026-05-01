import {expect, test} from '@playwright/test'

test('Built-in locators', async({page}) => {
 await page.goto('http://localhost:3000');
 await page.getByText('Register Page').first().click();
 await page.getByRole("textbox").first().fill('RCV Academy');
 await page.getByText("Terms & Conditions").click();
 await page.getByLabel("Email Address").fill("admin@rcvacademy.com");
 await page.getByPlaceholder("Choose a username").fill("rcvacademy");
 await page.getByAltText("Software Testing Mentor").click();
 await page.getByText('Register Page').first().click();
 await page.getByTitle("YouTube - STM").click();
 await page.getByTestId("header-linkedin").click();
})




