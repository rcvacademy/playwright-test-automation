// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
  test('Invalid credentials — wrong password', async ({ page }) => {
    // Navigate to login page to test invalid credentials
    await page.goto('http://localhost:3000/store/login');

    // Verify login page loads successfully
    await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();

    // Enter valid email for invalid credentials test
    await page.getByTestId('login-email').fill('testuser@example.com');

    // Enter incorrect password for invalid credentials test
    await page.getByTestId('login-password').fill('WrongPassword123');

    // Click login button with invalid credentials
    await page.getByTestId('login-submit-btn').click();

    // Verify user remains on login page after invalid credentials
    await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();
    
    // Check current URL to verify user remained on login page
    await expect(page).toHaveURL('http://localhost:3000/store/login');
    
    // Verify no authentication occurred (login form is still present)
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit-btn')).toBeVisible();
  });
});