import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { AddToCart } from "../pages/AddToCart";
import { TestConfig } from "../test.config";


let URL: TestConfig;
let SearchPage: SearchResultsPage;
let AddtoCart: AddToCart;

test.beforeEach(async ({ page }) => {
    URL = new TestConfig();
    SearchPage = new SearchResultsPage(page)
    AddtoCart = new AddToCart(page)
    await page.goto(URL.appUrl);
})

test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close();
})

test('Add a product to cart @sanity', async () => {

    async function addtocart(Itemname: string) {


        await SearchPage.SearchProduct(Itemname);
        await SearchPage.ProductPrize();
        await AddtoCart.AddToCart();
        const verify = await AddtoCart.VerifyTheMessage();
        expect(verify).toContain(`Success: You have added ${Itemname} to your shopping cart!`);
        await AddtoCart.GotoCart();
        const confirm = await AddtoCart.IsProductInCart();
        expect(confirm).toContain(`${Itemname}`)
    }


    await addtocart("iPhone");
    //await addtocart("MacBook");

})