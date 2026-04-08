import { Before, After } from '@wdio/cucumber-framework';
import LoginScreen from '../screenobjects/LoginScreen.js';
import TGATabBar from '../screenobjects/components/TGATabBar.js';

const TEST_EMAIL = process.env.TEST_USER_EMAIL ?? 'marlon.carbonero+automation@designli.co';
const TEST_PASS  = process.env.TEST_USER_PASS  ?? 'Pass123!';

Before(async () => {
    // Skip login if tab bar is already visible (user already logged in)
    const alreadyLoggedIn = await TGATabBar.home.isDisplayed().catch(() => false);
    if (alreadyLoggedIn) return;

    await LoginScreen.login(TEST_EMAIL, TEST_PASS);
    await driver.pause(3000);

    // Dismiss in-app "Turn on push notifications" modal
    try {
        const continueBtn = $('//*[@text="Continue"]');
        if (await continueBtn.waitForDisplayed({ timeout: 5000 })) {
            await continueBtn.click();
        }
    } catch (_) { /* no in-app notification modal */ }

    // Dismiss Android system notification permission dialog
    try {
        const allowBtn = $('//*[@text="Allow" or @text="While using the app" or @text="Only this time"]');
        if (await allowBtn.waitForDisplayed({ timeout: 5000 })) {
            await allowBtn.click();
        }
    } catch (_) { /* no system permission dialog */ }

    await TGATabBar.waitForTabBarShown();
});

After(async () => {
    await TGATabBar.openHome();
});
