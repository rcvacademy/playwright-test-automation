import {expect, test} from '@playwright/test'

test('Built-in locators', async({page}) => {
 await page.goto('http://localhost:3000');
 await page.getByText('Register Page').first().click();
 //By ID
 await page.locator("#full-name").fill("RCV Academy");

 //By name
 await page.locator('[name="email"]').fill("RCVAcademy@rcvacademy.com");

 //By Attribute
 await page.locator('[type="tel"]').fill("75237453");

 //By classname
 await page.locator('.form-control').count();
//  await page.locator('[class="btn btn-primary"]').click();

 //By tagname
  await page.locator('input').count();

  //combine multiple locators
  await page.locator('input[aria-label="Password"][data-testid="reg-password-input"]').fill("fsdgfddd");
 
  //Partial text match
  await page.locator(':text("Subscribe")').click();

  //Full text match
  await page.locator(':text-is("Subscribe to newsletter")').click();

  //By Css selector
  await page.locator('#terms').click();
  
  //By Xpath
  await page.locator('//*[@id="confirm-password"]').fill("hgdfhgdfhg");


})




