class TopMenuPage {
    constructor(page) {
        this.page = page;
        this.profileIcon = page.locator("#store-nav-profile-btn");
        this.logoutLink = page.getByTestId("dd-logout");
        this.cartIcon = page.locator("#store-nav-cart");
        this.myOrdersLink = page.locator("#store-nav-orders");
        this.myProfileLink = page.getByTestId("dd-profile");
       
    }

    async clickProfileIcon(){
        await this.profileIcon.click();
    }

    async clickLogoutLink(){
        await this.logoutLink.click();
    }

    async logoutFromApp(){
        await this.profileIcon.click();
        await this.logoutLink.click();
    }

    async clickOnCartIcon(){
        await this.cartIcon.click();
    }
    
    async clickOnMyOrdersLink(){
        await this.myOrdersLink.click();
    }

    async clickOnMyProfileLink(){
        await this.myProfileLink.click();
    }

    
}

module.exports = { TopMenuPage };