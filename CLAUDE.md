## Approach
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

## System Behavior
- **Conciseness:** No fluff, no "I've updated the file," just the logic or code.
- **Thinking Process:** Before writing tests, check `config/` for existing capabilities and `tests/screenobjects/` for existing selectors.
- **File Handling:** Prefer editing specific Page Objects/Step Definitions over recreating them.

## Technical Stack
- **Framework:** WebdriverIO (v9+) with Cucumber Framework.
- **Platform:** Mobile (Android/iOS) via Appium.
- **Language:** TypeScript (ES Modules).
- **Reporting:** Allure Reporter.
- **Standards:** Page Object Pattern (Screen Objects).

## Coding Standards
- **Selectors:** Use `accessibility id` (~) as the primary locator. Avoid XPath unless absolutely necessary.
- **Screen Objects:** One class per screen, stored in `tests/screenobjects/`.
- **Naming:** - Features: `kebab-case.feature`
  - Step Definitions: `camelCase.ts`
  - Screen Objects: `PascalCase.ts`
- **Async/Await:** All WebdriverIO commands must be awaited.

## Common Workflows (Scripts)
- **Local Android:** `npm run android.app`
- **Specific Feature (Tags):** - Home: `npm run test.home`
  - Journal: `npm run test.journal`
  - Workbooks: `npm run test.workbooks`
- **Linting:** `npm run lint`
- **Reports:** `npm run allure:report` (Generates and opens browser).

## Project Structure Notes
- `/config`: Contains all provider configs (SauceLabs, BrowserStack, Local).
- `/tests/features`: Cucumber Gherkin files.
- `/tests/step-definitions`: Implementation of Gherkin steps.
- `/tests/screenobjects`: Page Object models for mobile screens.
- `capabilities.json`: Shared device configurations.

## Debugging Protocol
1. Check `logs/` if a session fails to start.
2. Verify Appium server is running for local tests.
3. If a selector is missing, check both Android/iOS implementations in the Screen Object.