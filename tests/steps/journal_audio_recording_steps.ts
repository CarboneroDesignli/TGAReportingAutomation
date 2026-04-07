import { When, Then } from '@wdio/cucumber-framework';
import TGATabBar from '../screenobjects/components/TGATabBar.js';
import JournalScreen from '../screenobjects/JournalScreen.js';
import RecordAudioScreen from '../screenobjects/RecordAudioScreen.js';
import AudioJournalScreen from '../screenobjects/AudioJournalScreen.js';
import RecordingDetailScreen from '../screenobjects/RecordingDetailScreen.js';

// Shared across steps in this scenario
let savedRecordingTitle = '';

When('I tap the Record Audio tab', async () => {
    await JournalScreen.tapRecordAudioTab();
    await RecordAudioScreen.waitForIsShown();
});

When('I record audio for 5 seconds', async () => {
    await RecordAudioScreen.tapRecord();
    await driver.pause(3000);
});

When('I tap Finish', async () => {
    await RecordAudioScreen.tapFinish();
    await AudioJournalScreen.waitForIsShown();
});

When('I enter {string} as the recording title', async (baseTitle: string) => {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    savedRecordingTitle = `${baseTitle} - ${dateTime}`;
    await AudioJournalScreen.setTitle(savedRecordingTitle);
});

When('I tap Replace and try again', async () => {
    await AudioJournalScreen.tapReplaceAndTryAgain();
    await RecordAudioScreen.waitForIsShown();
});

When('I save the recording', async () => {
    await AudioJournalScreen.tapSave();
    // After saving we return to the Record Audio screen
    await RecordAudioScreen.waitForIsShown();
});

Then('I can see the recording in My recordings', async () => {
    await JournalScreen.tapMyRecordingsTab();
    const visible = await JournalScreen.isRecordingVisible(savedRecordingTitle);
    expect(visible).toBe(true);
});

When('I tap the saved recording', async () => {
    await JournalScreen.tapRecordingByTitle(savedRecordingTitle);
});

Then('I am on the recording detail screen', async () => {
    await RecordingDetailScreen.waitForIsShown();
});

When('I go back from the recording', async () => {
    await driver.back();
    await JournalScreen.waitForIsShown();
});

When('I navigate to Home', async () => {
    await TGATabBar.openHome();
});
