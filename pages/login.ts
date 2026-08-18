import { th } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";

export class LoginPage {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locator for the email address input field
    private readonly mailaddress: Locator;

    // Locator for the password input field
    private readonly Password: Locator;

    // Locator for the "Forgotten Password" link
    private readonly forgotpwd: Locator;

    // Locator for the Login button
    private readonly Loginbutton: Locator;

    // Locator for the login fail warning message

    private readonly LoginFail:Locator;


    // Constructor
    // Receives the Playwright Page object and initializes all locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the email address input field using its ID
        this.mailaddress = page.locator("#input-email");

        // Locate the password input field using its ID
        this.Password = page.locator("#input-password");

        // Locate the "Forgotten Password" link
        this.forgotpwd = page.locator("div[class='form-group'] a");

        // Locate the Login button using its value attribute
        this.Loginbutton = page.locator("input[value='Login']");

       // Locate the Login button using its value attribute
        this.LoginFail = page.locator('div.alert.alert-danger.alert-dismissible');
    }


    // Enters the provided email address into the email field
    async enterEmail(Email: string) {

        // Fill the email input with the provided email
        await this.mailaddress.fill(Email);
    }


    // Enters the provided password into the password field
    async enterPWD(password: string) {

        // Fill the password input with the provided password
        await this.Password.fill(password);
    }


    // Clicks the Login button
    async clickLogin() {

        // Click the Login button to submit the login form
        await this.Loginbutton.click();
    }

    async ifLoginFailMessage()
    {
        await this.LoginFail.textContent();
    }


    // Performs the complete login flow
    // Accepts email and password as parameters and performs login in one method
    async loginFlow(email: string, password: string) {

        // Enter the email address
        await this.mailaddress.fill(email);

        // Enter the password
        await this.Password.fill(password);

        // Click the Login button
        await this.Loginbutton.click();
    }
}