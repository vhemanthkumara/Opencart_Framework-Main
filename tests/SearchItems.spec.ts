import { test } from "@playwright/test"
import { TestConfig } from "../test.config.js";
import { SearchResultsPage } from "../pages/SearchResultsPage.js";


// Runs before every test
// Initializes the test configuration and navigates to the application
test.beforeEach(async ({ page }) => {

    // Create an instance of the test configuration
    const config = new TestConfig();

    // Navigate to the application URL
    await page.goto(config.appUrl);
});


// Runs after every test
// Closes the current browser page after test execution
test.afterEach(async ({ page }) => {

    // Close the browser page
    await page.close();
});


// Search Product test
// @smoke tag allows this test to be executed as part of the Smoke test suite
test("Search any item @smoke", async ({ page }) => {

    // Create an instance of the Search Results Page Object
    const searchingAnyItem = new SearchResultsPage(page);

    // Search for the specified product
    await searchingAnyItem.SearchProduct("MacBook Air");

    // Retrieve and display the price of the searched product
    await searchingAnyItem.ProductPrize();
});