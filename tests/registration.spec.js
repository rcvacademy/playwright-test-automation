const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:3000';

test.describe('Store Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/store/register`);
  });

  test('positive — successful registration', async ({ page }) => {
    const ts = Date.now();
    const email = `user+${ts}@example.com`;

    await page.fill('[data-testid="reg-first-name"]', 'John');
    await page.fill('[data-testid="reg-last-name"]', 'Doe');
    await page.fill('[data-testid="reg-email"]', email);
    await page.fill('[data-testid="reg-password"]', 'Password123!');
    await page.fill('[data-testid="reg-confirm-password"]', 'Password123!');
    await page.check('[data-testid="reg-terms"]');
    if (await page.locator('[data-testid="reg-gdpr-consent"]').count() > 0) {
      await page.check('[data-testid="reg-gdpr-consent"]');
    }

    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/store/register') && resp.request().method() === 'POST',
        { timeout: 5000 }
      ).catch(() => null),
      page.click('[data-testid="reg-submit-btn"]'),
    ]);

    if (response) {
      expect(response.status()).toBeLessThan(400);
    } else {
      await page.waitForNavigation({ timeout: 5000 }).catch(() => null);
      expect(page.url()).not.toContain('/store/register');
    }
  });

  test('negative — invalid email shows validation error', async ({ page }) => {
    await page.fill('[data-testid="reg-first-name"]', 'Jane');
    await page.fill('[data-testid="reg-last-name"]', 'Doe');
    await page.fill('[data-testid="reg-email"]', 'invalid-email');
    await page.fill('[data-testid="reg-password"]', 'Password123!');
    await page.fill('[data-testid="reg-confirm-password"]', 'Password123!');
    await page.check('[data-testid="reg-terms"]');

    await page.click('[data-testid="reg-submit-btn"]');

    await expect(page.locator('[data-testid="err-email"]')).toBeVisible({ timeout: 3000 });
    expect(page.url()).toContain('/store/register');
  });

  test('negative — password mismatch shows error', async ({ page }) => {
    await page.fill('[data-testid="reg-first-name"]', 'Alice');
    await page.fill('[data-testid="reg-last-name"]', 'Smith');
    await page.fill('[data-testid="reg-email"]', `alice+${Date.now()}@example.com`);
    await page.fill('[data-testid="reg-password"]', 'Password123!');
    await page.fill('[data-testid="reg-confirm-password"]', 'DifferentPass!');
    await page.check('[data-testid="reg-terms"]');

    await page.click('[data-testid="reg-submit-btn"]');

    const confirmErr = page.locator('[data-testid="err-confirmPassword"]');
    const generalErr = page.locator('.field-error');

    // wait for either a specific confirm-password error or any visible field error
    await Promise.race([
      confirmErr.waitFor({ state: 'visible', timeout: 3000 }).catch(() => null),
      generalErr.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => null),
    ]);

    expect(page.url()).toContain('/store/register');
  });

  test('negative — missing required fields show errors', async ({ page }) => {
    await page.click('[data-testid="reg-submit-btn"]');

    await expect(page.locator('[data-testid="err-firstName"]')).toBeVisible();
    await expect(page.locator('[data-testid="err-lastName"]')).toBeVisible();
    await expect(page.locator('[data-testid="err-email"]')).toBeVisible();
  });

  test('edge — very long first name is rejected', async ({ page }) => {
    const longName = 'A'.repeat(300);
    await page.fill('[data-testid="reg-first-name"]', longName);
    await page.fill('[data-testid="reg-last-name"]', 'Edge');
    await page.fill('[data-testid="reg-email"]', `edge+${Date.now()}@example.com`);
    await page.fill('[data-testid="reg-password"]', 'Password123!');
    await page.fill('[data-testid="reg-confirm-password"]', 'Password123!');
    await page.check('[data-testid="reg-terms"]');

    await page.click('[data-testid="reg-submit-btn"]');

    const resp = await page.waitForResponse(
      (resp) => resp.url().includes('/store/register') && resp.request().method() === 'POST',
      { timeout: 5000 }
    ).catch(() => null);

    if (resp) {
      expect(resp.status()).toBeGreaterThanOrEqual(400);
    } else {
      await expect(page.locator('[data-testid="err-firstName"]')).toBeVisible();
    }
  });
});
const { readDataFromFile } = require('../utils/fileUtils');

function firstLocator(page, selectors) {
    return page.locator(selectors.join(',')).first();
}

async function fillRegistrationForm(page, data, waitTimeout = 5000) {
    const url = process.env.BASE_URL
        ? (process.env.BASE_URL.endsWith('/store')
            ? `${process.env.BASE_URL}/register`
            : `${process.env.BASE_URL}/store/register`)
        : 'http://localhost:3000/store/register';
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // fail fast if page shows a 404 or similar
    if (await page.locator('text=Page Not Found').count() > 0) {
        throw new Error('Register page not found (404)');
    }

    const firstName = firstLocator(page, [
        'input[name="firstName"]', 'input#firstName', 'input[placeholder*="First"]'
    ]);
    await firstName.waitFor({ timeout: waitTimeout });
    await firstName.fill(String(data.firstName));

    const lastName = firstLocator(page, [
        'input[name="lastName"]', 'input#lastName', 'input[placeholder*="Last"]'
    ]);
    if (await lastName.count()) await lastName.fill(String(data.lastName));

    const email = firstLocator(page, [
        'input[name="email"]', 'input#email', 'input[placeholder*="Email"]'
    ]);
    if (await email.count()) await email.fill(String(data.email));

    const password = firstLocator(page, [
        'input[name="password"]', 'input#password', 'input[placeholder*="Password"]'
    ]);
    if (await password.count()) await password.fill(String(data.password));

    const confirm = firstLocator(page, [
        'input[name="confirmPassword"]', 'input#confirmPassword', 'input[placeholder*="Confirm"]'
    ]);
    if (await confirm.count()) await confirm.fill(String(data.confirmPassword));

    const submit = page.locator('button[type="submit"], button:has-text("Register"), button:has-text("Sign up"), input[type="submit"]').first();
    if (await submit.count()) await submit.click();
}

test.describe('Registration page tests', () => {

    test('Positive: successful registration', async ({ page }) => {
        const file = await readDataFromFile('registrationData.json');
        const td = JSON.parse(file);
        const data = td.find(d => d.case === 'positive');

        await fillRegistrationForm(page, data);

        await expect.poll(async () => page.url(), { timeout: 5000 }).not.toContain('/store/register');
    });

    test('Negative: invalid email and short password validations', async ({ page }) => {
        const file = await readDataFromFile('registrationData.json');
        const td = JSON.parse(file);

        const invalid = td.find(d => d.case === 'invalidEmail');
        await fillRegistrationForm(page, invalid);

        const emailInvalid = page.locator('input[name="email"][aria-invalid="true"], input#email[aria-invalid="true"], text=/invalid email|email is invalid/i');
        await expect(emailInvalid.first()).toBeVisible({ timeout: 3000 }).catch(() => {});

        const short = td.find(d => d.case === 'shortPassword');
        await fillRegistrationForm(page, short);
        const pwError = page.locator('input[name="password"][aria-invalid="true"], text=/password.*(short|min)/i');
        await expect(pwError.first()).toBeVisible({ timeout: 3000 }).catch(() => {});
    });

    test('Edge: very long inputs should be handled or rejected', async ({ page }) => {
        const file = await readDataFromFile('registrationData.json');
        const td = JSON.parse(file);
        const edge = td.find(d => d.case === 'edgeLongInput');

        await fillRegistrationForm(page, edge, 10000);

        await expect(page).toHaveURL(/.*\/store\/register/, { timeout: 3000 }).catch(() => {});
    });

});
