import { Locator, Page } from "@playwright/test";

export class Logout {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locator for the Logout button/link
    private readonly logoutButton: Locator;

    // Locator for the logout confirmation message displayed after logout
    private readonly logoutMessage: Locator;

    // Locator for the Continue button displayed after logout
    private readonly continueButton: Locator;


    // Constructor
    // Receives the Playwright Page object and initializes all locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the Logout link
        // .filter({ hasText: 'Logout' }) finds links containing the text "Logout"
        // .first() selects the first matching Logout link
        this.logoutButton = page.locator('a')
            .filter({ hasText: 'Logout' })
            .first();

        // Locate the heading containing the logout confirmation message
        this.logoutMessage = page.locator('#content h1');

        // Locate the Continue link displayed after successful logout
        this.continueButton = page.locator('a:has-text("Continue")');
    }


    // Clicks the Logout button/link
    async clickOnLogout() {

        // Click the Logout link
        await this.logoutButton.click();
    }


    // Retrieves the logout confirmation message
    // Returns the text displayed in the logout message
    async verifyLogoutMessage() {

        // Get and return the visible text from the logout message
        return await this.logoutMessage.innerText();
    }


    // Clicks the Continue button after logout
    async clickOnContinue() {

        // Click the Continue link
        await this.continueButton.click();
    }
}