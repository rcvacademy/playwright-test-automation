import { expect, test } from '@playwright/test'

test('@basictests Filtering locators', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // await page.getByRole("listitem").filter({hasText: "Register Page"}).click();
  // console.log(await page.getByRole("listitem").filter({ hasNotText: "Tooltips" }).count());
  // await page.getByRole("listitem").filter({hasNot: page.getByText("Radio Buttons")}).count()
  // await page.getByRole("listitem").filter({hasText: "Multi-Login Sections"}).click();
  await page.getByRole("listitem").filter({hasText: "Radio Buttons"}).click();
  // await page.locator('#login-form-2').getByRole('textbox', {name: "password"}).fill("hsdfhgd");

  // await page.locator("div").filter({has: page.locator("#section-3")}).getByRole("textbox", {name: "username"}).fill("rcvacademy");
  // await page.locator('div', {hasText: "Section 2"}).getByRole('textbox', {name: "password"}).fill("hsdfhgd");
  await page.locator('form div label input[id="rating-5"]').click();
})




