export default class AppScreen {
    private selector: string;

    constructor (selector: string) {
        this.selector = selector;
    }

    async waitForIsShown (isShown = true): Promise<boolean | void> {
        return $(this.selector).waitForDisplayed({ timeout: 15000, reverse: !isShown });
    }
}
