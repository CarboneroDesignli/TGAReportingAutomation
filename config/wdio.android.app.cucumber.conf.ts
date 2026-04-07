import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";
import path from "path";
import url from "node:url";
import allure from "@wdio/allure-reporter";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// We need to remove the `mochaOpts` from the `baseConfig` to have all
// Mocha references removed
const { mochaOpts, ...cleanBaseConfig } = baseConfig;

export const config: WebdriverIO.Config = {
    ...cleanBaseConfig,

    // ============
    // Reporters
    // ============
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
        }],
    ],

    // ============
    // Specs
    // ============
    specs: ["../tests/features/**/*.feature"],
    // ============
    // Framework
    // ============
    // By default we use the Mocha framework, see the `wdio.shared.conf.ts` which is imported by `./wdio.shared.local.appium.conf.js`. For Cucumber we need to "redefine" the framework
    framework: "cucumber",
    //
    // You also need to specify where your step definitions are located.
    // See also: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [
            path.join(__dirname, "..", "tests", "steps", "common_steps.ts"),
            path.join(
                __dirname,
                "..",
                "tests",
                "steps",
                "memory_book_photo_upload_steps.ts"
            ),
            path.join(
                __dirname,
                "..",
                "tests",
                "steps",
                "good_moment_upload_steps.ts"
            ),
            path.join(
                __dirname,
                "..",
                "tests",
                "steps",
                "journal_audio_recording_steps.ts"
            ),
        ], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source URIs
        strict: false, // <boolean> fail if there are any undefined or pending steps
        timeout: 60000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        scenarioLevelReporter: false, // Enable this to make webdriver.io behave as if scenarios and not steps were the tests.
    },
    // ============
    // Hooks
    // ============
    afterStep: async function (step, _scenario, result) {
        try {
            const screenshot = await driver.takeScreenshot();
            const status = result.passed ? 'PASSED' : 'FAILED';
            allure.addAttachment(
                `[${status}] ${step.text}`,
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        } catch (err) {
            console.warn('Failed to take step screenshot:', err);
        }
    },

    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            platformName: "Android",
            "wdio:maxInstances": 1,
            "appium:udid": "R5CXA3M1FAF",
            "appium:deviceName": "SM-A556E",
            "appium:platformVersion": "16",
            "appium:orientation": "PORTRAIT",
            "appium:automationName": "UiAutomator2",
            "appium:appPackage": "com.thegriefapp.qa",
            "appium:appActivity": "com.thegriefapp.MainActivity",
            "appium:appWaitActivity": "com.thegriefapp.MainActivity",
            "appium:newCommandTimeout": 240,
            "appium:noReset": true,
        },
    ],
};
