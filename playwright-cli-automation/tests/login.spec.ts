import { test, expect } from '@playwright/test';

test('Login existing user', async ({ page }) => {
  const url = 'http://localhost:3000/store/login';
  await page.goto(url);

  const email = 'john.doe1234@gmail.com';
  const password = 'Test@1234';

  const emailSelectors = [
    '[data-testid="login-email"]',
    '[data-testid="email"]',
    'input[name="email"]',
    'input[type="email"]',
    'input[placeholder*="Email"]',
    'input[id*="email"]'
  ];

  const passwordSelectors = [
    '[data-testid="login-password"]',
    '[data-testid="password"]',
    'input[name="password"]',
    'input[type="password"]',
    'input[id*="password"]'
  ];

  async function fillFirst(selectors: string[], value: string) {
    for (const sel of selectors) {
      const loc = page.locator(sel);
      if (await loc.count() > 0) {
        try {
          await loc.first().fill(value);
          return true;
        } catch (e) {
          // ignore and try next
        }
      }
    }
    return false;
  }

  const filledEmail = await fillFirst(emailSelectors, email);
  const filledPassword = await fillFirst(passwordSelectors, password);

  if (!filledEmail || !filledPassword) {
    throw new Error('Could not find email or password inputs on the login page');
  }

  const submitSelectors = [
    '[data-testid="login-submit-btn"]',
    'button[type="submit"]',
    'button:has-text("Login")',
    'button:has-text("Sign in")',
    'input[type="submit"]'
  ];

  let clicked = false;
  for (const sel of submitSelectors) {
    const loc = page.locator(sel);
    if (await loc.count() > 0) {
      try {
        await loc.first().click();
        clicked = true;
        break;
      } catch (e) {}
    }
  }

  if (!clicked) {
    throw new Error('Could not find a submit button on the login page');
  }

  // Wait for expected post-login behavior:
  // 1) navigation to /store (same pattern used by register test), or
  // 2) appearance of 'Logout' / 'Sign out' text, or
  // 3) presence of the user's email on the page
  try {
    await page.waitForURL('**/store', { timeout: 10000 });
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(1000);
  const body = await page.locator('body').innerText();
  const success = !page.url().includes('/login') ||
    /Logout|Sign out|Log out/i.test(body) ||
    body.includes(email);

  expect(success).toBeTruthy();
});
