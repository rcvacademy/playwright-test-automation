import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envFile = `.env.${process.env.TEST_ENV || 'dev'}`

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  reporter: [
    ['allure-playwright', {resultsDir: 'allure-rp'}], ['html', {outputFolder: 'reports'}],['json', {outputFile: 'reports/samplejsonreport.json'}],['dot'],['line'],['list']
  ],
  timeout: 30000,
  retries: 1,
  expect: {
    timeout: 10000,
  },
  use: {
    trace: 'retain-on-first-failure',
    browserName: 'chromium',
    headless: false,
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles',
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
    screenshot: 'on-first-failure',
    video: 'on-first-retry'
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        // headless: false,
        // viewport: { width: 200, height: 100 },
        locale: 'en-US',
        timezoneId: 'America/Los_Angeles',
        colorScheme: 'light',
        ignoreHTTPSErrors: true
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // headless: false,
      }
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
      }
    },
    // {
    //   name: 'iPhone15-pro-landscape',
    //   use: {
    //     ...devices['iPhone 15 Pro landscape'],
    //     headless: false,
    //   }
    // }
  ]
});

