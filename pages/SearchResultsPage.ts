import { Page, Locator } from "@playwright/test"

export class SearchResultsPage {

    private readonly page: Page;
    private readonly SearchBar: Locator;
    private readonly SearchButton: Locator;
    //private readonly Item:Locator;
    private readonly ItemPrize: Locator;
    // private readonly ReturnItemPrize:Locator;

    constructor(page: Page) {
        this.page = page;
        this.SearchBar = page.getByPlaceholder('Search');
        this.SearchButton = page.locator("//button[@class='btn btn-default btn-lg']");
        this.ItemPrize = page.locator("ul[class='list-unstyled'] li h2");


    }

    async SearchProduct(ItemName: string) {
        await this.SearchBar.fill(ItemName);
        await this.SearchButton.click();
        await this.page.getByText(ItemName, { exact: true }).click();
    }

    async ProductPrize()
    {
        const itemPrize = await this.ItemPrize.innerText();
        console.log(`The Prize of the item is - ${itemPrize}`);
        return this.ItemPrize
    }

}
