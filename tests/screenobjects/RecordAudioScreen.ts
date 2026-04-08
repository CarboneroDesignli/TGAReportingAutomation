import AppScreen from './AppScreen.js';

const SELECTORS = {
    // Record Audio tab remains visible on this screen — used as identifier
    SCREEN: '~Record Audio',
    TAB_RECORD_AUDIO: '~Record Audio',
    TAB_MY_RECORDINGS: '~My recordings',
    // Circular record/stop button — no content-desc, located by full hierarchy from content root
    RECORD_BUTTON: '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[7]',
    // Finish button appears during an active recording — use content-desc on the clickable ViewGroup, not the inner TextView (which is clickable=false)
    FINISH_BUTTON: '//android.view.ViewGroup[@content-desc="Finish"]',
    // Popup button that appears when first entering the Record Audio screen
    ADD_MY_AUDIO_ENTRY: '~Add my audio entry',
};

class RecordAudioScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get recordAudioTab () { return $(SELECTORS.TAB_RECORD_AUDIO); }
    get myRecordingsTab () { return $(SELECTORS.TAB_MY_RECORDINGS); }
    // No content-desc on the record/stop control — xpath only
    get recordButton () { return $(SELECTORS.RECORD_BUTTON); }
    get finishButton () { return $(SELECTORS.FINISH_BUTTON); }
    get addMyAudioEntryButton () { return $(SELECTORS.ADD_MY_AUDIO_ENTRY); }

    async tapAddMyAudioEntry () {
        await this.addMyAudioEntryButton.waitForDisplayed({ timeout: 5000 });
        await this.addMyAudioEntryButton.click();
    }

    async tapRecord () {
        await this.recordButton.click();
    }

    async tapFinish () {
        await this.finishButton.waitForDisplayed({ timeout: 5000 });
        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: 800, y: 1900 })
            .down()
            .up()
            .perform();
    }

    async tapMyRecordingsTab () {
        await this.myRecordingsTab.click();
    }
}

export default new RecordAudioScreen();
