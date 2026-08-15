import { Page, Locator } from "@playwright/test";

export class RegisterPage {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locators for the registration form fields and controls
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;

    // Locator for selecting the "Yes" option for newsletter subscription
    private readonly subscribeYes: Locator;

    // Locator for accepting the Privacy Policy checkbox
    private readonly privacyPolicy: Locator;

    // Locator for the Continue button used to submit the registration form
    private readonly continueButton: Locator;

    // Locator for the final registration confirmation message
    private readonly finalmessage: Locator;


    // Constructor
    // Receives the Playwright Page object and initializes all page locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the First Name input field
        this.firstName = page.getByRole("textbox", { name: "First Name" });

        // Locate the Last Name input field
        this.lastName = page.getByRole("textbox", { name: "Last Name" });

        // Locate the E-Mail input field
        this.email = page.getByRole("textbox", { name: "E-Mail" });

        // Locate the Telephone input field
        this.telephone = page.getByRole("textbox", { name: "Telephone" });

        // Locate the Password input field using its ID
        this.password = page.locator("#input-password");

        // Locate the Confirm Password input field using its ID
        this.confirmPassword = page.locator("#input-confirm");

        // Locate the "Yes" option for newsletter subscription
        this.subscribeYes = page.getByLabel("Yes");

        // Locate the Privacy Policy checkbox
        this.privacyPolicy = page.getByRole("checkbox");

        // Locate the Continue button used to submit the registration form
        this.continueButton = page.locator('input[value="Continue"]');

        // Locate the registration confirmation message/container
        this.finalmessage = page.locator('#content');
    }


    // Enters the first name into the registration form
    async enterFirstName(firstName: string): Promise<void> {

        // Fill the First Name field with the provided value
        await this.firstName.fill(firstName);
    }


    // Enters the last name into the registration form
    async enterLastName(lastName: string): Promise<void> {

        // Fill the Last Name field with the provided value
        await this.lastName.fill(lastName);
    }


    // Enters the email address into the registration form
    // Returns the same email so it can be reused later, for example during login
    async enterEmail(email: string): Promise<string> {

        // Fill the E-Mail field with the provided email
        await this.email.fill(email);

        // Return the email for reuse in the test
        return email;
    }


    // Enters the telephone number into the registration form
    async enterPhoneNumber(phoneNumber: string): Promise<void> {

        // Fill the Telephone field with the provided phone number
        await this.telephone.fill(phoneNumber);
    }


    // Enters the password into the registration form
    async enterPassword(password: string): Promise<void> {

        // Fill the Password field with the provided password
        await this.password.fill(password);
    }


    // Enters the password again for confirmation
    async enterConfirmPassword(password: string): Promise<void> {

        // Fill the Confirm Password field with the same password
        await this.confirmPassword.fill(password);
    }


    // Selects "Yes" for newsletter subscription
    async selectSubscribeYes(): Promise<void> {

        // Click the Yes option
        await this.subscribeYes.click();
    }


    // Accepts the Privacy Policy
    async acceptPrivacyPolicy(): Promise<void> {

        // Check the Privacy Policy checkbox
        await this.privacyPolicy.check();
    }


    // Submits the registration form
    async clickContinue(): Promise<void> {

        // Click the Continue button
        await this.continueButton.click();
    }


    // Retrieves the registration confirmation message
    async getconfirmMessage(): Promise<string> {

        // Get the text from the confirmation message
        // Return an empty string if textContent() returns null
        return await this.finalmessage.textContent() ?? '';
    }


    // Performs the complete user registration flow
    // Accepts all required registration details as parameters
    async registerUser(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string
    ): Promise<void> {

        // Enter the first name
        await this.enterFirstName(firstName);

        // Enter the last name
        await this.enterLastName(lastName);

        // Enter the email address
        await this.enterEmail(email);

        // Enter the phone number
        await this.enterPhoneNumber(phoneNumber);

        // Enter the password
        await this.enterPassword(password);

        // Enter the same password in the confirmation field
        await this.enterConfirmPassword(password);

        // Select Yes for newsletter subscription
        await this.selectSubscribeYes();

        // Accept the Privacy Policy
        await this.acceptPrivacyPolicy();

        // Submit the registration form
        await this.clickContinue();
    }
}