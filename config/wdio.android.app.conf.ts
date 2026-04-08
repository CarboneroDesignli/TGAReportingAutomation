import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Specs
    // ============
    specs: ["../tests/specs/**/app*.spec.ts"],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: "Android",
            "wdio:maxInstances": 1,
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here

            "appium:deviceName": "SM-A556E",
            "appium:udid": "R5CXA3M1FAF",
            "appium:platformVersion": "16",
            "appium:orientation": "PORTRAIT",
            "appium:automationName": "UiAutomator2",
            "appium:appPackage": "com.thegriefapp",
            "appium:appActivity": "com.thegriefapp.MainActivity",
            "appium:appWaitActivity": "com.thegriefapp.MainActivity",
            "appium:newCommandTimeout": 240,
            "appium:noReset": true,
            "appium:dontStopAppOnReset": true,
        },
    ],
};
