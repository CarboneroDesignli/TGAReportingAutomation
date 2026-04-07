import AppScreen from './AppScreen.js';

const SELECTORS = {
    // Record Audio tab is always present when on the Journal screen
    SCREEN: '~Record Audio',
    TAB_RECORD_AUDIO: '~Record Audio',
    TAB_MY_RECORDINGS: '~My recordings',
};

class JournalScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    // Sub-tabs
    get recordAudioTab () { return $(SELECTORS.TAB_RECORD_AUDIO); }
    get myRecordingsTab () { return $(SELECTORS.TAB_MY_RECORDINGS); }

    // Dynamic recording items — identified by their full label (e.g. "Recording_2026_03_27_13:03, Mar 27, 2026, 0:01")
    recordingByLabel (label: string) { return $(`~${label}`); }

    async tapRecordAudioTab () {
        await this.recordAudioTab.click();
    }

    async tapMyRecordingsTab () {
        await this.myRecordingsTab.click();
    }

    async tapRecordingByLabel (label: string) {
        await this.recordingByLabel(label).click();
    }

    // Find a recording card by its title TextView text (used after saving with a custom title)
    recordingByTitle (title: string) { return $(`//android.widget.TextView[@text="${title}"]`); }

    async isRecordingVisible (title: string): Promise<boolean> {
        return this.recordingByTitle(title)
            .waitForDisplayed({ timeout: 10000 })
            .then(() => true)
            .catch(() => false);
    }

    async tapRecordingByTitle (title: string) {
        await this.recordingByTitle(title).click();
    }
}

export default new JournalScreen();
