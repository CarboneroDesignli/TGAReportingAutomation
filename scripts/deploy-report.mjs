import { execSync } from "child_process";
import { existsSync, rmSync, mkdirSync, cpSync } from "fs";
import path from "path";

const REPORT_DIR = "allure-report";
const HISTORY_DIR = path.join("allure-results", "history");
const REMOTE_URL = execSync("git remote get-url origin").toString().trim();

function run(cmd, opts = {}) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: "inherit", ...opts });
}

// 1. Restore history from previous gh-pages to preserve trends
console.log("Fetching history from gh-pages...");
try {
    run("git fetch origin gh-pages --depth=1");
    if (existsSync("history")) rmSync("history", { recursive: true });
    run("git checkout origin/gh-pages -- history");
    if (existsSync(HISTORY_DIR)) rmSync(HISTORY_DIR, { recursive: true });
    mkdirSync(path.dirname(HISTORY_DIR), { recursive: true });
    cpSync("history", HISTORY_DIR, { recursive: true });
    rmSync("history", { recursive: true });
    console.log("History restored.");
} catch {
    console.log("No previous history found, starting fresh.");
}

// 2. Generate report
console.log("\nGenerating Allure report...");
run(`npx allure generate allure-results --clean -o ${REPORT_DIR}`);

// 3. Push to gh-pages
console.log("\nDeploying to gh-pages...");
const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
const gitName = execSync("git config user.name").toString().trim();
const gitEmail = execSync("git config user.email").toString().trim();
run("git init -b gh-pages", { cwd: REPORT_DIR });
run(`git config user.name "${gitName}"`, { cwd: REPORT_DIR });
run(`git config user.email "${gitEmail}"`, { cwd: REPORT_DIR });
run("git add .", { cwd: REPORT_DIR });
run(`git commit -m "Deploy Allure report ${timestamp}"`, { cwd: REPORT_DIR });
run(`git push --force "${REMOTE_URL}" gh-pages`, { cwd: REPORT_DIR });

rmSync(path.join(REPORT_DIR, ".git"), { recursive: true });
console.log("\nDone. Report published to GitHub Pages.");
