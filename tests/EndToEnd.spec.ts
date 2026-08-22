import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config.js";
import { RandomData } from "../utils/RandomData.js";
import { HomePage } from "../pages/HomePage.js";
import { MyAccountPage } from "../pages/MyAccountPage.js";
import { RegisterPage } from "../pages/Register.js";
import { LoginPage } from "../pages/login.js";
import { SearchResultsPage } from "../pages/SearchResultsPage.js";
import { AddToCart } from "../pages/AddToCart.js";
import { Logout } from "../pages/logout.js";

// Declare Page Object and configuration variables
let URL: TestConfig;
let login: LoginPage;
let MyAccount: MyAccountPage;
let Homepage: HomePage;
let register: RegisterPage;
let search: SearchResultsPage;
let Addtocart: AddToCart;
let logout: Logout;


// Runs before every test
// Initializes all Page Object classes and test configuration
test.beforeEach(async ({ page }) => {

    // Create an instance of the test configuration
    URL = new TestConfig();

    // Initialize the Login Page Object
    login = new LoginPage(page);

    // Initialize the My Account Page Object
    MyAccount = new MyAccountPage(page);

    // Initialize the Home Page Object
    Homepage = new HomePage(page);

    // Initialize the Register Page Object
    register = new RegisterPage(page);

    // Initialize the Search Results Page Object
    search = new SearchResultsPage(page);

    // Initialize the Add To Cart Page Object
    Addtocart = new AddToCart(page);

    // Initialize the Logout Page Object
    logout = new Logout(page);
});


// Runs after every test
// Performs logout and closes the browser page
test.afterEach(async ({ page }) => {

    // Wait for 3 seconds after test execution
    // This can be useful for observing the final state during debugging
    await page.waitForTimeout(3000);

    // Open the My Account menu
    await Homepage.ClickMyAccount();

    // Click the Logout option
    await logout.clickOnLogout();

    // Click Continue after successful logout
    await logout.clickOnContinue();

    // Close the current browser page
    await page.close();
});


// End-to-End Scenario
// @sanity tag allows this test to be executed as part of the Sanity test suite
test("End to End Scenario @sanity", async ({ page }) => {

    // Navigate to the application URL
    await page.goto(URL.appUrl);


    // -------------------------------
    // STEP 1: USER REGISTRATION
    // -------------------------------

    // Open the My Account menu
    await Homepage.ClickMyAccount();

    // Navigate to the Registration page
    await Homepage.Register();


    // Generate dynamic test data
    // The same email and password will be reused during login
    const email = RandomData.getEmail();
    const PWD = RandomData.getPassword();


    // Enter a randomly generated first name
    await register.enterFirstName(
        RandomData.getFirstName()
    );

    // Enter a randomly generated last name
    await register.enterLastName(
        RandomData.getLastName()
    );

    // Enter the generated email address
    await register.enterEmail(email);

    // Enter a randomly generated phone number
    await register.enterPhoneNumber(
        RandomData.getPhoneNumber()
    );

    // Enter the generated password
    await register.enterPassword(PWD);

    // Enter the same password in the Confirm Password field
    await register.enterConfirmPassword(PWD);

    // Select Yes for newsletter subscription
    await register.selectSubscribeYes();

    // Accept the Privacy Policy
    await register.acceptPrivacyPolicy();

    // Submit the registration form
    await register.clickContinue();


    // -------------------------------
    // STEP 2: LOGOUT AFTER REGISTRATION
    // -------------------------------

    // Open the My Account menu
    await Homepage.ClickMyAccount();

    // Logout from the newly created account
    await logout.clickOnLogout();


    // ------------------------------- 
    // STEP 3: LOGIN WITH CREATED USER
    // -------------------------------

    // Open the My Account menu
    await Homepage.ClickMyAccount();

    // Navigate to the Login page
    await Homepage.login();

    // Enter the same email that was used during registration
    await login.enterEmail(email);

    // Enter the same password that was used during registration
    await login.enterPWD(PWD);

    // Click the Login button
    await login.clickLogin();


    // -------------------------------
    // STEP 4: SEARCH FOR PRODUCT
    // -------------------------------

    // Search for the MacBook product
    await search.SearchProduct("MacBook");

    // Retrieve and display the product price
    await search.ProductPrize();


    // -------------------------------
    // STEP 5: ADD PRODUCT TO CART
    // -------------------------------

    // Add the MacBook to the shopping cart
    await Addtocart.AddToCart();

    // Retrieve the confirmation message displayed after adding the product
    const verify = await Addtocart.VerifyTheMessage();

    // Verify that the correct product was successfully added
    expect(verify).toContain(
        "Success: You have added MacBook to your shopping cart!"
    );


    // -------------------------------
    // STEP 6: VERIFY PRODUCT IN CART
    // -------------------------------

    // Navigate to the shopping cart
    await Addtocart.GotoCart();

    // Retrieve the product name displayed in the cart
    const confirm = await Addtocart.IsProductInCart();

    // Verify that MacBook is present in the shopping cart
    expect(confirm).toContain("MacBook");
});