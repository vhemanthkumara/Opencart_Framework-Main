import { Page, Locator } from "@playwright/test";

export class MyAccountPage {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locator for the "My Account" heading displayed after successful account creation/login
    private readonly msgHeading: Locator;


    // Constructor
    // Receives the Playwright Page object and initializes the page locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the "My Account" heading using its text
        this.msgHeading = page.locator('h2:has-text("My Account")');
    }


    // Verifies whether the "My Account" heading is visible
    // Returns true if the heading is visible, otherwise returns false
    async isMyAccountCreated() {

        try {

            // Check whether the "My Account" heading is visible on the page
            const isVisible = await this.msgHeading.isVisible();

            // Return the visibility status
            return isVisible;

        } catch (error) {

            // Log the error if the account verification fails
            console.log(`The account could not be verified: ${error}`);

            // Return false when the account cannot be verified
            return false;
        }
    }
}