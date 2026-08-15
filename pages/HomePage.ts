import { Locator, Page } from "@playwright/test";

export class HomePage {

    // Stores the current Playwright page instance
    private readonly page: Page;

    // Locators
    // Locator for the "My Account" menu in the navigation bar
    private readonly Mylinkaccount: Locator;

    // Locator for the "Register" option under My Account
    private readonly RegisterMyaccount: Locator;

    // Locator for the "Login" option under My Account
    private readonly LoginMyaccount: Locator;

    // Locator for the search input field
    private readonly SearchBar: Locator;

    // Locator for the search button on the home page
    private readonly SearchButton: Locator;

    // Locator for the search button on the search results page
    private readonly SearchButton2: Locator;


    // Constructor
    // Receives the Playwright Page object and initializes all page locators
    constructor(page: Page) {

        // Assign the Playwright page instance to the class variable
        this.page = page;

        // Locate the "My Account" menu
        this.Mylinkaccount = page.locator('span:has-text("My Account")');

        // Locate the "Register" option under My Account
        this.RegisterMyaccount = page.locator('.list-inline ul li:has-text("Register")');

        // Locate the "Login" option under My Account
        this.LoginMyaccount = page.locator('.list-inline ul li:has-text("Login")');

        // Locate the search input field
        this.SearchBar = page.locator('input.form-control');

        // Locate the search button on the home page
        this.SearchButton = page.locator('.input-group-btn');

        // Locate the search button on the search results page
        this.SearchButton2 = page.locator("input#button-search");
    }


    // Action Methods

    // Verifies whether the page has a title
    async isPageexist() {

        // Get the title of the current page
        const title = await this.page.title();

        // Return true if a page title exists
        if (title) {
            return true;
        }

        // Return false if the page does not have a title
        return false;
    }


    // Clicks the "My Account" menu
    async ClickMyAccount() {

        try {

            // Click the My Account menu
            await this.Mylinkaccount.click();

        } catch (error) {

            // Log the error if the click fails
            console.log(`Error while clicking My Account: ${error}`);

            // Re-throw the error so Playwright marks the test as failed
            throw error;
        }
    }


    // Clicks the "Register" option under My Account
    async Register() {

        try {

            // Click the Register option
            await this.RegisterMyaccount.click();

        } catch (error) {

            // Log the error if registration navigation fails
            console.log(`Error while clicking Register: ${error}`);

            // Re-throw the error so the test does not continue with a false result
            throw error;
        }
    }


    // Clicks the "Login" option under My Account
    async login() {

        try {

            // Click the Login option
            await this.LoginMyaccount.click();

        } catch (error) {

            // Log the error if the login navigation fails
            console.log(`Error while clicking Login: ${error}`);

            // Re-throw the error so Playwright marks the test as failed
            throw error;
        }
    }


    // Enters the product name into the search field
    async Search(item: string) {

        try {

            // Enter the provided product name into the search bar
            await this.SearchBar.fill(item);

        } catch (error) {

            // Log the error if entering the search item fails
            console.log(`Error while entering text in search bar: ${error}`);

            // Re-throw the error so the test fails correctly
            throw error;
        }
    }


    // Clicks the search button
    async Search_Button() {

        try {

            // Click the search button
            await this.SearchButton.click();

        } catch (error) {

            // Log the error if the search button click fails
            console.log(`Error while clicking search button: ${error}`);

            // Re-throw the error so the test fails correctly
            throw error;
        }
    }
}