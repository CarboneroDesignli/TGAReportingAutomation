import AppScreen from './AppScreen.js';

const SELECTORS = {
    // Audio player container is the unique element on this screen
    SCREEN: '~Audio',
    AUDIO_PLAYER: '~Audio',
    // Inner playback control — no content-desc, child of the Audio container
    AUDIO_PLAYER_CONTROL: '//android.view.ViewGroup[@content-desc="Audio"]/android.view.ViewGroup',
};

class RecordingDetailScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get audioPlayer () { return $(SELECTORS.AUDIO_PLAYER); }
    // Inner control has no content-desc — xpath only
    get audioPlayerControl () { return $(SELECTORS.AUDIO_PLAYER_CONTROL); }

    async tapAudioPlayerControl () {
        await this.audioPlayerControl.click();
    }
}

export default new RecordingDetailScreen();
