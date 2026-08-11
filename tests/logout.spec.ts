import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { Logout } from "../pages/logout";
import { LoginPage } from "../pages/login";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homepage: HomePage;
let logInpage: LoginPage;
let logout: Logout;

test.beforeEach(async ({ page }) => {

    config = new TestConfig;
    await page.goto(config.appUrl);

    homepage = new HomePage(page);
    await homepage.ClickMyAccount();
    await homepage.login();

    logInpage = new LoginPage(page);
    await logInpage.enterEmail(config.email);
    await logInpage.enterPWD(config.password);
    await logInpage.clickLogin();

    logout = new Logout(page);

})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
})



test("logout Flow @smoke", async () => {

    await homepage.ClickMyAccount();
    await logout.clickonlogout();
    const logoutMessage = await logout.VerifyLogoutMessage();
    expect(logoutMessage).toContain("Account Logout");

})