import { test, expect } from '@playwright/test';

test('Register new user', async ({ page }) => {
  await page.goto('http://localhost:3000/store/register');

  await page.getByTestId('reg-first-name').fill('John');
  await page.getByTestId('reg-last-name').fill('Doe');
  await page.getByTestId('reg-email').fill('john454544@gmail.com');
  await page.getByTestId('reg-phone').fill('3442343');

  // Date inputs require ISO format
  await page.getByTestId('reg-dob').fill('1995-01-01');

  await page.getByTestId('reg-password').fill('Test@1234');
  await page.getByTestId('reg-confirm-password').fill('Test@1234');

  await page.getByTestId('reg-terms').check();
  await page.getByTestId('reg-gdpr-consent').check();

  await page.getByTestId('reg-submit-btn').click();

  // Verify redirection and that the user name appears in the page
  await page.waitForURL('**/store', { timeout: 10000 });
  expect(page.url()).toContain('/store');

  const body = await page.locator('body').innerText();
  expect(body).toContain('John');
});
