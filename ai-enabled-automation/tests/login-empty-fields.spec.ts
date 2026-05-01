// spec: specs/login-test-plan.md  
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
  test('Empty fields validation', async ({ page }) => {
    // Navigate to login page to test empty fields validation
    await page.goto('http://localhost:3000/store/login');

    // Verify login page loads successfully  
    await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit-btn')).toBeVisible();

    // Click login button with empty fields to test validation
    await page.getByTestId('login-submit-btn').click();

    // Verify login page is still visible after empty form submission
    await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();

    // Verify email field is still visible after empty form submission  
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();

    // Verify user remains on login page (no navigation occurred)
    await expect(page).toHaveURL('http://localhost:3000/store/login');

    // Verify form fields are empty (client-side validation should prevent submission)
    await expect(page.getByTestId('login-email')).toHaveValue('');
    await expect(page.getByTestId('login-password')).toHaveValue('');
  });
});