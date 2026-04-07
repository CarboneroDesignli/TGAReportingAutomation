import { Given } from '@wdio/cucumber-framework';
import TGATabBar from '../screenobjects/components/TGATabBar.js';
import MemoryBookScreen from '../screenobjects/MemoryBookScreen.js';
import JournalScreen from '../screenobjects/JournalScreen.js';

Given('I am on the Memory Book screen', async () => {
    await TGATabBar.openMemoryBook();
    await MemoryBookScreen.waitForIsShown();
});

Given('I am on the Journal screen', async () => {
    await TGATabBar.openJournal();
    await JournalScreen.waitForIsShown();
});
