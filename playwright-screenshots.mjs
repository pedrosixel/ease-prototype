/**
 * Ease prototype screenshot automation
 * URL: https://ease-prototype.vercel.app
 * Viewport: 390×844 @ 3x
 *
 * Role screen has two phases:
 *  Phase 1: full-screen tap overlay (aria-label="Continue"), role cards disabled
 *  Phase 2: overlay gone, role cards enabled
 * Must click the tap overlay before clicking role cards.
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const OUT  = "/Users/pedrosixel/Desktop/Ease — Graduate Project/07 — Screenshots/Prototype";
const URL  = "https://ease-prototype.vercel.app";
const VP   = { width: 390, height: 844 };
const WAIT = 900;

const results = [];
let page;

// ── helpers ─────────────────────────────────────────────────────────────────

async function shot(filename) {
  await page.waitForTimeout(WAIT);
  const fp = path.join(OUT, filename);
  await page.screenshot({ path: fp, fullPage: false });
  const size = fs.statSync(fp).size;
  results.push({ file: fp, size, ok: true });
  console.log(`✓ ${filename}  (${(size / 1024).toFixed(1)} KB)`);
}

async function btn(text) {
  const loc = page.locator("button").filter({ hasText: new RegExp(text, "i") }).first();
  await loc.waitFor({ state: "visible", timeout: 10000 });
  await loc.click();
  await page.waitForTimeout(600);
}

async function btnExact(text) {
  const loc = page.getByRole("button", { name: text, exact: true });
  await loc.waitFor({ state: "visible", timeout: 10000 });
  await loc.click();
  await page.waitForTimeout(600);
}

// Fresh load + walk Welcome → SignUp → Terms(scroll+agree) → Role phase1
async function freshToRole() {
  await page.evaluate(() => localStorage.clear());
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Welcome → Sign Up
  await btnExact("Sign Up");

  // SignUp → Create Account (goes to Terms, sets isNewUser=true)
  await btn("Create Account");

  // Terms: scroll text area to bottom, enable checkbox, agree, Continue
  await page.locator(".overflow-y-auto.rounded-2xl").evaluate((el) => {
    el.scrollTop = el.scrollHeight;
    el.dispatchEvent(new Event("scroll", { bubbles: true }));
  });
  await page.waitForTimeout(500);
  await page.locator("button").filter({ hasText: /I have read and agree/i }).first().click();
  await page.waitForTimeout(300);
  await btn("Continue"); // → Role screen (phase1)

  // Role phase1 → tap overlay to unlock phase2
  await page.locator('[aria-label="Continue"]').waitFor({ state: "visible", timeout: 5000 });
  await page.locator('[aria-label="Continue"]').click();
  await page.waitForTimeout(700); // animation
}

// ── main ────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VP, deviceScaleFactor: 3 });
  page = await context.newPage();

  // ── 01  Welcome ───────────────────────────────────────────────────────────
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await shot("01_welcome.png");

  // Navigate to Role phase2
  await freshToRole();

  // ── 02  Role selection (phase 2 — cards enabled) ──────────────────────────
  await shot("02_role_selection.png");

  // Select "I'm a parent"
  await page.locator("button").filter({ hasText: /I'm a parent/i }).first().click();
  await page.waitForTimeout(400);

  // ── (bonus) could take role screen with parent selected here ──────────────
  // Proceed — Continue as Parent → PlaybookIntro
  await btn("Continue as Parent");

  // ── 03  Playbook intro ────────────────────────────────────────────────────
  await shot("03_playbook_intro.png");

  // Let's build it → ChildInfo
  await btn("Let's build it");

  // ChildInfo → Continue → Meet
  await btn("Continue");

  // Meet → Continue → Triggers (ChipScreen)
  await btn("Continue");

  // ── 04  Onboarding — Triggers ─────────────────────────────────────────────
  await shot("04_onboarding_triggers.png");

  // Triggers → Calming → Avoid → Emergency → Complete
  await btn("Continue"); // → calming
  await btn("Continue"); // → avoid
  await btn("Continue"); // → emergency
  await btn("Continue"); // → complete

  // ── 05  Onboarding complete ───────────────────────────────────────────────
  await shot("05_onboarding_complete.png");

  // Go to Home → HomeV2
  await btn("Go to Home");

  // ── 06  Home — Profile tab ────────────────────────────────────────────────
  const profileTab = page.locator("button").filter({ hasText: /^Profile$/i }).first();
  if (await profileTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await profileTab.click();
    await page.waitForTimeout(400);
  }
  await shot("06_home_profile.png");

  // ── 07  Home — Insights tab ───────────────────────────────────────────────
  await page.locator("button").filter({ hasText: /^Insights$/i }).first().click();
  await page.waitForTimeout(400);
  await shot("07_home_insights.png");

  // ── 08  Home — Emergency tab ──────────────────────────────────────────────
  await page.locator("button").filter({ hasText: /^Emergency$/i }).first().click();
  await page.waitForTimeout(400);
  await shot("08_home_emergency.png");

  // ── 09  Crisis — Plan tab ─────────────────────────────────────────────────
  await page.locator('[aria-label="Open crisis view"]').first().click();
  await page.waitForTimeout(700);
  const planTab = page.locator("button").filter({ hasText: /^Plan$/i }).first();
  if (await planTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await planTab.click();
    await page.waitForTimeout(400);
  }
  await shot("09_crisis_plan.png");

  // ── 10  Crisis — Emergency tab ────────────────────────────────────────────
  await page.locator("button").filter({ hasText: /^Emergency$/i }).first().click();
  await page.waitForTimeout(400);
  await shot("10_crisis_emergency.png");

  // ── 11  Post-crisis ───────────────────────────────────────────────────────
  await btn("Add Log");
  await shot("11_post_crisis.png");

  // ══ CAREGIVER FLOW ════════════════════════════════════════════════════════
  // Fresh page load, clear storage, walk to Role phase2
  await freshToRole();

  // Select "I'm a caregiver"
  await page.locator("button").filter({ hasText: /I'm a caregiver/i }).first().click();
  await page.waitForTimeout(400);

  // Continue as Caregiver → CaregiverBio
  await btn("Continue as Caregiver");

  // CaregiverBio → Continue → CaregiverConnect
  await btn("Continue");

  // CaregiverConnect → Connect → CaregiverList
  // (CaregiverList redirects to CaregiverWelcome on first visit)
  await btn("Connect");

  // CaregiverWelcome → Got it, show my list → CaregiverList
  await btn("Got it, show my list");

  // ── 12  Caregiver My List ─────────────────────────────────────────────────
  // Note: checkedInChildId defaults to "tyler" in state, so Tyler shows
  // "Currently with this child" and Heitor shows "Check In".
  await shot("12_caregiver_mylist.png");

  // Tyler is already checked in — click "View Profile →" to reach Bridge directly
  await page.locator("button").filter({ hasText: /View Profile/i }).first().click();
  await page.waitForTimeout(600);

  // ── 13  Pre-session bridge ────────────────────────────────────────────────
  await shot("13_pre_session_bridge.png");

  // Bridge → I'm ready → CaregiverHome
  await btn("I'm ready");

  // ── 14  Caregiver Home — playbook (top) ──────────────────────────────────
  await shot("14_caregiver_home_playbook.png");

  // ── 15  Caregiver Home — scrolled to bottom ──────────────────────────────
  // Scroll the main overflow-y-auto container
  const scrollable = page.locator(".overflow-y-auto").first();
  await scrollable.evaluate((el) => { el.scrollTop = el.scrollHeight; });
  await page.waitForTimeout(600);
  await shot("15_caregiver_home_emergency.png");

  await browser.close();

  // ── confirmation ──────────────────────────────────────────────────────────
  console.log("\n── Confirmation ──────────────────────────────────────────");
  for (const r of results) {
    console.log(`${r.ok ? "✓" : "✗"}  ${r.file}  (${(r.size / 1024).toFixed(1)} KB)`);
  }
  console.log(`\nTotal: ${results.length}/15 files`);
})().catch((err) => {
  console.error("\nFATAL:", err.message);
  process.exit(1);
});
