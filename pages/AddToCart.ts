import{Page, Locator} from "@playwright/test"

export class AddToCart
{
    private readonly page:Page;
    private readonly AddToCartButton:Locator;
    private readonly ConfirmMessageText:Locator;
    private readonly GoToCartButton:Locator;
    private readonly ViewCartLink:Locator;
    private readonly ConfirmProductInCart:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.AddToCartButton = page.locator("#button-cart");
        this.ConfirmMessageText = page.locator("div.alert");
        this.GoToCartButton = page.locator('#cart-total');
        this.ViewCartLink = page.getByText('View Cart', { exact: true });
        this.ConfirmProductInCart = page.locator('.table-responsive tbody td:nth-child(2)');
    }

    async AddToCart()
    {
        await this.AddToCartButton.click();
    }
    async VerifyTheMessage()
    {
        return (this.ConfirmMessageText.textContent());
    }

    async GotoCart()
    {
        await this.GoToCartButton.click();
        await this.ViewCartLink.click();
    }
    async IsProductInCart()
    {
        return this.ConfirmProductInCart.innerText();
    }

}