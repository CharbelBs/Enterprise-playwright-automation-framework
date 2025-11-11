import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

const authFile = "src/config/auth.json";

test.skip("simple login test with self heal", async () => {
  encryptEnvFile();
  //const loginPage = new LoginPage(page);
  //await loginPage.navigateToLoginPage();
  //await loginPage.fillUsername_selfheal("demo_selfheal");
});

test("simple login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  console.log('NODE_ENV=', process.env.NODE_ENV);
  console.log('NODE_ENV=', process.env.userid);
  console.log('NODE_ENV=', process.env.password);
  await page.waitForTimeout(3000);
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));

  await page.waitForTimeout(3000);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
});

test.skip("Login with auth file", async ({ browser }) => {
  const context = await browser.newContext({ storageState: authFile });
  const page = await context.newPage();
  await page.goto(
    "https://mukunthanr2-dev-ed.lightning.force.com/lightning/page/home"
  );
  await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
});
