import { defineConfig } from "@playwright/test";

const baseURL =
  process.env.E2E_BASE_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.DEPLOY_URL ||
  undefined;

export default defineConfig({
  testDir: "e2e",
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL,
    headless: true,
    trace: "retain-on-failure",
  },
});
