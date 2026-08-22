import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { RegisterPage } from "../pages/Register.js"
import { RandomData } from "../utils/RandomData.js"
import { TestConfig } from "../test.config.js";

// Declare Page Object and configuration variables
let homepage: HomePage;
let registerpage: RegisterPage;
let config: TestConfig;


// Runs before every test
// Initializes the configuration and Page Object classes
// Then navigates to the application URL
test.beforeEach(async ({ page }) => {

    // Create an instance of the test configuration
    config = new TestConfig();

    // Initialize the Home Page Object with the current Playwright page
    homepage = new HomePage(page);

    // Initialize the Register Page Object with the current Playwright page
    registerpage = new RegisterPage(page);

    // Navigate to the application URL
    await page.goto(config.appUrl);
});


// Runs after every test
// Waits for a few seconds and then closes the browser page
test.afterEach(async ({ page }) => {

    // Wait for 5 seconds after test execution
    // This can be useful for observing the final state during local execution
    await page.waitForTimeout(5000);

    // Close the current browser page
    await page.close();
});


// Account Registration test
// @sanity tag allows this test to be executed as part of the Sanity test suite
test("Account Registration @sanity", async () => {

    // Click the "My Account" menu
    await homepage.ClickMyAccount();

    // Select the "Register" option
    await homepage.Register();


    // Enter a randomly generated first name
    await registerpage.enterFirstName(
        RandomData.getFirstName()
    );

    // Enter a randomly generated last name
    await registerpage.enterLastName(
        RandomData.getLastName()
    );

    // Enter a randomly generated email address
    // This helps avoid duplicate email issues during registration
    await registerpage.enterEmail(
        RandomData.getEmail()
    );

    // Enter a randomly generated phone number
    await registerpage.enterPhoneNumber(
        RandomData.getPhoneNumber()
    );


    // Generate a random password
    // Store it in a variable so the same password can be used
    // for both Password and Confirm Password fields
    const password = RandomData.getPassword();

    // Enter the generated password
    await registerpage.enterPassword(password);

    // Enter the same password in the Confirm Password field
    await registerpage.enterConfirmPassword(password);


    // Select "Yes" for newsletter subscription
    await registerpage.selectSubscribeYes();

    // Accept the Privacy Policy checkbox
    await registerpage.acceptPrivacyPolicy();

    // Submit the registration form
    await registerpage.clickContinue();


    // Retrieve the registration confirmation message
    const ConfirmMessage = await registerpage.getconfirmMessage();

    // Verify that the account creation confirmation message is displayed
    expect(ConfirmMessage).toContain(
        "Your Account Has Been Created!"
    );
});