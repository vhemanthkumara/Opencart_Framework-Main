import { test } from "@playwright/test"
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage"


test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test("Search any item", async ({ page }) => {
    const searchingnyItem = new SearchResultsPage(page);
    await searchingnyItem.SearchProduct("MacBook Air");
    await searchingnyItem.ProductPrize();
})
