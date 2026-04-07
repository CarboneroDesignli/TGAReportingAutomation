const SELECTORS = {
    HOME: '~Home',
    MEMORY_BOOK: '~Memory Book',
    JOURNAL: '~Journal',
    RESOURCES: '~Resources',
};

export default class TGATabBar {
    static get home () { return $(SELECTORS.HOME); }
    static get memoryBook () { return $(SELECTORS.MEMORY_BOOK); }
    static get journal () { return $(SELECTORS.JOURNAL); }
    static get resources () { return $(SELECTORS.RESOURCES); }

    static async openHome () {
        await TGATabBar.home.click();
    }

    static async openMemoryBook () {
        await TGATabBar.memoryBook.click();
    }

    static async openJournal () {
        await TGATabBar.journal.click();
    }

    static async openResources () {
        await TGATabBar.resources.click();
    }

    static async waitForTabBarShown (): Promise<boolean | void> {
        return TGATabBar.home.waitForDisplayed({ timeout: 20000 });
    }
}
