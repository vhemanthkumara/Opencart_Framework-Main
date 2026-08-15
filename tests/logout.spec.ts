import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { Logout } from "../pages/logout";
import { LoginPage } from "../pages/login";
import { TestConfig } from "../test.config";

// Declare configuration and Page Object variables
let config: TestConfig;
let homepage: HomePage;
let logInpage: LoginPage;
let logout: Logout;


// Runs before every test
// Performs the login flow so that the logout test starts with an authenticated user
test.beforeEach(async ({ page }) => {

    // Create an instance of the test configuration
    config = new TestConfig();

    // Navigate to the application URL
    await page.goto(config.appUrl);

    // Initialize the Home Page Object
    homepage = new HomePage(page);

    // Open the My Account menu
    await homepage.ClickMyAccount();

    // Navigate to the Login page
    await homepage.login();


    // Initialize the Login Page Object
    logInpage = new LoginPage(page);

    // Enter the configured email address
    await logInpage.enterEmail(config.email);

    // Enter the configured password
    await logInpage.enterPWD(config.password);

    // Click the Login button
    await logInpage.clickLogin();


    // Initialize the Logout Page Object
    logout = new Logout(page);
});


// Runs after every test
// Closes the current browser page after test execution
test.afterEach(async ({ page }) => {

    // Wait for 3 seconds
    // This can be useful while debugging locally
    await page.waitForTimeout(3000);

    // Close the browser page
    await page.close();
});


// Logout Flow test
// @smoke tag allows this test to be executed as part of the Smoke test suite
test("Logout Flow @smoke", async () => {

    // Open the My Account menu
    await homepage.ClickMyAccount();

    // Click the Logout option
    await logout.clickOnLogout();


    // Retrieve the logout confirmation message
    const logoutMessage = await logout.verifyLogoutMessage();


    // Verify that the expected logout confirmation message is displayed
    expect(logoutMessage).toContain("Account Logout");
});