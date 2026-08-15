import { Page, Locator } from "@playwright/test";

export class AddToCart {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locator for the "Add to Cart" button on the product details page
    private readonly AddToCartButton: Locator;

    // Locator for the success/confirmation message displayed after adding a product
    private readonly ConfirmMessageText: Locator;

    // Locator for the cart button displayed in the top navigation
    private readonly GoToCartButton: Locator;

    // Locator for the "View Cart" link in the cart dropdown
    private readonly ViewCartLink: Locator;

    // Locator for the product name displayed inside the shopping cart
    private readonly ConfirmProductInCart: Locator;


    constructor(page: Page) {

        // Assign the Playwright page object passed from the test
        this.page = page;

        // Identify the "Add to Cart" button using its ID
        this.AddToCartButton = page.locator("#button-cart");

        // Identify the alert message displayed after adding the product
        this.ConfirmMessageText = page.locator("div.alert");

        // Identify the cart summary/button in the top navigation
        this.GoToCartButton = page.locator("#cart-total");

        // Identify the "View Cart" link from the cart dropdown
        this.ViewCartLink = page.getByText("View Cart", { exact: true });

        // Identify the product name displayed in the cart table
        this.ConfirmProductInCart =
            page.locator(".table-responsive tbody td:nth-child(2)");
    }


    // Clicks the "Add to Cart" button to add the selected product
    async AddToCart() {
        await this.AddToCartButton.click();
    }


    // Retrieves the confirmation message displayed after adding the product
    async VerifyTheMessage() {
        return this.ConfirmMessageText.textContent();
    }


    // Opens the cart dropdown and navigates to the View Cart page
    async GotoCart() {

        // Click the cart button in the top navigation
        await this.GoToCartButton.click();

        // Click the "View Cart" link from the dropdown
        await this.ViewCartLink.click();
    }


    // Retrieves the product name from the shopping cart
    // This can be used to verify that the expected product was added successfully
    async IsProductInCart() {
        return this.ConfirmProductInCart.innerText();
    }
}