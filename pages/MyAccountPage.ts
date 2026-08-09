import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
    private readonly page: Page;
    private readonly msgHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgHeading = page.locator('h2:has-text("My Account")')
    }

    async Ismyaccountcreated() {
        try {
            const Isvisible = await this.msgHeading.isVisible();
            return Isvisible;
        }
        catch (error) {
            console.log(`the account is not vallid ${error}`)
            return false;
        }
    }
    
}