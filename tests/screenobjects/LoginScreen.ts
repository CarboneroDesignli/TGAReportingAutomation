import AppScreen from './AppScreen.js';

const SELECTORS = {
    GET_STARTED:    '//*[@text="Get started"]',
    EMAIL_INPUT:    '//android.widget.EditText[1]',
    PASSWORD_INPUT: '//android.widget.EditText[@password="true"]',
    CONTINUE:       '//*[@text="Continue"]',
};

export default class LoginScreen extends AppScreen {
    constructor() {
        super(SELECTORS.GET_STARTED);
    }

    static get getStartedBtn() { return $(SELECTORS.GET_STARTED); }
    static get emailInput()    { return $(SELECTORS.EMAIL_INPUT); }
    static get passwordInput() { return $(SELECTORS.PASSWORD_INPUT); }
    static get continueBtn()   { return $(SELECTORS.CONTINUE); }

    static async login(email: string, password: string): Promise<void> {
        await LoginScreen.getStartedBtn.waitForDisplayed({ timeout: 15000 });
        await LoginScreen.getStartedBtn.click();
        await LoginScreen.emailInput.waitForDisplayed({ timeout: 10000 });
        await LoginScreen.emailInput.setValue(email);
        await LoginScreen.passwordInput.setValue(password);
        await LoginScreen.continueBtn.click();
    }
}
