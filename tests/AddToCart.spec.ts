import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage.js";
import { AddToCart } from "../pages/AddToCart.js";
import { TestConfig } from "../test.config.js";

// Declare Page Object and configuration variables
let URL: TestConfig;
let SearchPage: SearchResultsPage;
let AddtoCart: AddToCart;


// Runs before every test
// Initializes the configuration and Page Object classes
// Then navigates to the application URL
test.beforeEach(async ({ page }) => {

    // Create an instance of the test configuration
    URL = new TestConfig();

    // Initialize the Search Results Page Object
    SearchPage = new SearchResultsPage(page);

    // Initialize the Add To Cart Page Object
    AddtoCart = new AddToCart(page);

    // Navigate to the application URL
    await page.goto(URL.appUrl);
});


// Runs after every test
// Waits for a few seconds and then closes the browser page
test.afterEach(async ({ page }) => {

    // Wait for 3 seconds after test execution
    // This can be useful while debugging the test locally
    await page.waitForTimeout(3000);

    // Close the current browser page
    await page.close();
});


// Add Product to Cart test
// @sanity tag allows this test to be executed as part of the Sanity test suite
test("Add a product to cart @sanity", async () => {

    // Reusable function to search for a product,
    // verify its price, add it to the cart,
    // and verify that the product is present in the cart
    async function addtocart(Itemname: string) {

        // Search for the specified product
        await SearchPage.SearchProduct(Itemname);

        // Retrieve and display the product price
        await SearchPage.ProductPrize();

        // Add the selected product to the shopping cart
        await AddtoCart.AddToCart();

        // Retrieve the confirmation message displayed after adding the product
        const verify = await AddtoCart.VerifyTheMessage();

        // Verify that the correct product was successfully added
        expect(verify).toContain(
            `Success: You have added ${Itemname} to your shopping cart!`
        );

        // Navigate to the shopping cart
        await AddtoCart.GotoCart();

        // Retrieve the product name displayed in the cart
        const confirm = await AddtoCart.IsProductInCart();

        // Verify that the expected product is present in the cart
        expect(confirm).toContain(`${Itemname}`);
    }


    // Execute the reusable Add To Cart flow for iPhone
    await addtocart("iPhone");

    // Execute the same flow for MacBook if required
    // await addtocart("MacBook");
});