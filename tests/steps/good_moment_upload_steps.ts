import { When, Then } from '@wdio/cucumber-framework';
import MemoryBookScreen from '../screenobjects/MemoryBookScreen.js';
import AddGoodMomentScreen from '../screenobjects/AddGoodMomentScreen.js';

When('I tap the "Good moments" tab', async () => {
    await MemoryBookScreen.tapGoodMomentsTab();
});

When('I tap "Add a good moment"', async () => {
    await MemoryBookScreen.tapAddGoodMoment();
    await AddGoodMomentScreen.waitForIsShown();
});

When('I tap the picture icon on the good moment screen', async () => {
    await AddGoodMomentScreen.tapPhotoButton();
    await driver.pause(1000);
});

When('I enter {string} as the moment text', async (momentText: string) => {
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const fullText = `${momentText} - ${dateTime}`;
    console.log(`Writing moment: ${fullText}`);
    await AddGoodMomentScreen.setMoment(fullText);
});

When('I save the good moment', async () => {
    await AddGoodMomentScreen.tapSave();
});

Then('I am returned to the Memory Book screen', async () => {
    await MemoryBookScreen.waitForIsShown();
});
