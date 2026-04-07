import AppScreen from './AppScreen.js';

const SELECTORS = {
    // "Audio Journal" heading — contains() guards against leading/trailing whitespace in the text node
    SCREEN: '//android.widget.TextView[contains(@text,"Audio Journal")]',
    // Only one EditText on this screen — the "What did you talk about?" field
    TITLE_INPUT: '//android.widget.EditText[1]',
    // Save is a clickable ViewGroup; the inner TextView is clickable=false
    SAVE_BUTTON: '//android.view.ViewGroup[@content-desc="Save"]',
    REPLACE_BUTTON: '//android.widget.TextView[@text="Replace and try again"]',
};

class AudioJournalScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get titleInput () { return $(SELECTORS.TITLE_INPUT); }
    get saveButton () { return $(SELECTORS.SAVE_BUTTON); }
    get replaceButton () { return $(SELECTORS.REPLACE_BUTTON); }

    async setTitle (text: string) {
        await this.titleInput.click();
        await this.titleInput.setValue(text);
        await driver.hideKeyboard();
    }

    async tapSave () {
        await this.saveButton.click();
    }

    async tapReplaceAndTryAgain () {
        await this.replaceButton.click();
    }
}

export default new AudioJournalScreen();
