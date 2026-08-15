import { Page, Locator } from "@playwright/test";

export class SearchResultsPage {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locator for the search input field
    private readonly SearchBar: Locator;

    // Locator for the search button
    private readonly SearchButton: Locator;

    // Locator for the product price displayed on the product page
    private readonly ItemPrize: Locator;


    // Constructor
    // Receives the Playwright Page object and initializes all page locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the search input field using its placeholder text
        this.SearchBar = page.getByPlaceholder("Search");

        // Locate the Search button using its XPath
        this.SearchButton = page.locator(
            "//button[@class='btn btn-default btn-lg']"
        );

        // Locate the product price from the product details section
        this.ItemPrize = page.locator(
            "ul[class='list-unstyled'] li h2"
        );
    }


    // Searches for a product and opens the selected product
    async SearchProduct(ItemName: string) {

        // Enter the product name into the search bar
        await this.SearchBar.fill(ItemName);

        // Click the Search button
        await this.SearchButton.click();

        // Select the product with the exact matching name
        await this.page.getByText(ItemName, { exact: true }).click();
    }


    // Retrieves and returns the price of the selected product
    async ProductPrize() {

        // Get the visible text of the product price
        const itemPrize = await this.ItemPrize.innerText();

        // Print the product price in the console for debugging/information
        console.log(`The Price of the item is - ${itemPrize}`);

        // Return the actual price as a string
        return itemPrize;
    }
}