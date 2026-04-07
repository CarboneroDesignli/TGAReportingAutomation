import AppScreen from './AppScreen.js';

const SELECTORS = {
    // Moment input is unique to this form
    SCREEN: '//android.widget.EditText[@text="What was your good moment ?"]',
    MOMENT_INPUT: '//android.widget.EditText[@text="What was your good moment ?"]',
    SAVE_BUTTON: '~Save',
    // Photo area is the first ViewGroup sibling before the EditText
    PHOTO_BUTTON: '//android.widget.EditText[@text="What was your good moment ?"]/parent::android.view.ViewGroup/android.view.ViewGroup[1]',
};

class AddGoodMomentScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get momentInput () { return $(SELECTORS.MOMENT_INPUT); }
    // Save is disabled until moment text is entered
    get saveButton () { return $(SELECTORS.SAVE_BUTTON); }
    get photoButton () { return $(SELECTORS.PHOTO_BUTTON); }

    async tapPhotoButton () {
        await this.photoButton.waitForDisplayed({ timeout: 10000 });
        await this.photoButton.click();
    }

    async setMoment (text: string) {
        await this.momentInput.setValue(text);
    }

    async tapSave () {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
            await driver.pause(500);
        }
        await this.saveButton.waitForDisplayed({ timeout: 10000 });
        await this.saveButton.click();
    }

    async isSaveEnabled (): Promise<boolean> {
        return this.saveButton.isEnabled();
    }
}

export default new AddGoodMomentScreen();
