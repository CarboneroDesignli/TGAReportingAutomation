import AppScreen from './AppScreen.js';

const SELECTORS = {
    // Use the Memory book sub-tab as the screen identifier — always present when on this screen
    SCREEN: '~Memory book',
    PAGE_HEADER: '~Memory Book',
    TAB_MEMORY_BOOK: '~Memory book',
    TAB_GOOD_MOMENTS: '~Good moments',
    ADD_TO_MEMORY_BOOK: '~Add to memory book',
    ADD_GOOD_MOMENT: '//android.widget.TextView[@text="Add a good moment"]',
};

class MemoryBookScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    // Header (ViewGroup — non-interactive title at top of screen)
    get pageHeader () { return $('//android.view.ViewGroup[@content-desc="Memory Book"]'); }

    // Sub-tabs
    get memoryBookTab () { return $(SELECTORS.TAB_MEMORY_BOOK); }
    get goodMomentsTab () { return $(SELECTORS.TAB_GOOD_MOMENTS); }

    // CTAs visible per tab
    get addToMemoryBookButton () { return $(SELECTORS.ADD_TO_MEMORY_BOOK); }
    get addGoodMomentButton () { return $(SELECTORS.ADD_GOOD_MOMENT); }

    // Dynamic entry items — identified by their date+title label (e.g. "Apr 2026, A good moment")
    entryByLabel (label: string) { return $(`~${label}`); }

    async tapMemoryBookTab () {
        await this.memoryBookTab.click();
    }

    async tapGoodMomentsTab () {
        await this.goodMomentsTab.click();
    }

    async tapAddToMemoryBook () {
        await this.addToMemoryBookButton.click();
    }

    async tapAddGoodMoment () {
        await this.addGoodMomentButton.waitForDisplayed({ timeout: 10000 });
        await this.addGoodMomentButton.click();
    }

    async tapEntryByLabel (label: string) {
        await this.entryByLabel(label).click();
    }
}

export default new MemoryBookScreen();
