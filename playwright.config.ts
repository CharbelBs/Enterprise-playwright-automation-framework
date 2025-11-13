import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv"
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

if (!process.env.NODE_ENV) {
  dotenv.config({ path: `${__dirname}//src//config//.env` });
} else {
  dotenv.config({
    path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`,
  });
}

// Debug: print which environment is loaded and whether credentials are present
console.log("[playwright.config] NODE_ENV=", process.env.NODE_ENV);
console.log(
  "[playwright.config] userid present=",
  !!process.env.userid,
  " password present=",
  !!process.env.password
);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,

  testDir: "./src/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: "https://login.salesforce.com",

    //  baseURL: "https://reqres.in",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    // Try to open browser in a large/full window before tests
    // Note: some browsers/platforms ignore --start-maximized; we also set a large viewport/window size
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ["--start-maximized", "--window-size=1920,1080"]
    },

    screenshot: "on",
    
    video: "on"
    },

    /* Configure projects for major browsers */
    projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // override device viewport and launch args to open a large window
        viewport: { width: 1920, height: 1080 },
        launchOptions: { args: ["--start-maximized", "--window-size=1920,1080"] },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // // {
    // //   name: 'Mobile Safari',
    // //   use: { ...devices['iPhone 12'] },
    // // },

    // // /* Test against branded browsers. */
    // // {
    // //   name: 'Microsoft Edge',
    // //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // // },
    ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
