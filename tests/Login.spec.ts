import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/login";
import { TestConfig } from "../test.config";

// Declare configuration and Page Object variables
let config: TestConfig;
let homepage: HomePage;
let loginpage: LoginPage;


// Runs before every test
// Initializes the configuration and Page Objects
// Then navigates to the application and opens the Login page
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
    loginpage = new LoginPage(page);
});


// Runs after every test
// Waits for a few seconds and closes the browser page
test.afterEach(async ({ page }) => {

    // Wait for 5 seconds after test execution
    // This can be useful while debugging the test locally
    await page.waitForTimeout(5000);

    // Close the current browser page
    await page.close();
});


// Login Flow test
// @smoke tag allows this test to be executed as part of the Smoke test suite
test("Login Flow @smoke", async ({ page }) => {

    // Enter the email address from the test configuration
    await loginpage.enterEmail(config.email);

    // Enter the password from the test configuration
    await loginpage.enterPWD(config.password);

    // Click the Login button
    await loginpage.clickLogin();
});