import { expect, test } from "@playwright/test";

const baseURL =
  process.env.E2E_BASE_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.DEPLOY_URL ||
  "";

test.describe("registration form", () => {
  test.skip(!baseURL, "E2E base URL not configured.");

  test("submits the registration form", async ({ page }) => {
    if (baseURL.includes("localhost") || baseURL.includes("127.0.0.1")) {
      await page.route("**/netlify-forms.html", async (route) => {
        await route.fulfill({ status: 200, contentType: "text/html", body: "ok" });
      });
    }

    await page.goto(`${baseURL}/register`);

  const form = page.locator("form[name=registration]");
  await expect(form).toBeVisible();

  const requiredFields = form.locator("input[required], textarea[required], select[required]");
  const requiredCount = await requiredFields.count();

  for (let index = 0; index < requiredCount; index += 1) {
    const field = requiredFields.nth(index);
    const tagName = await field.evaluate((el) => el.tagName.toLowerCase());
    const type = (await field.getAttribute("type")) || "";

    if (type === "radio" || type === "checkbox") {
      await field.check();
      continue;
    }

    if (tagName === "select") {
      const value = await field.evaluate((el) => {
        const select = el as HTMLSelectElement;
        const options = Array.from(select.options) as HTMLOptionElement[];
        const first = options.find((option) => option.value);
        return first ? first.value : "";
      });

      if (value) {
        await field.selectOption(value);
      }

      continue;
    }

    if (type === "date") {
      await field.fill("1990-01-01");
      continue;
    }

    if (type === "email") {
      await field.fill("test@example.com");
      continue;
    }

    if (type === "tel") {
      await field.fill("555-123-4567");
      continue;
    }

    await field.fill("Test");
  }

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/netlify-forms.html") &&
      response.request().method() === "POST" &&
      response.ok()
  );

    await Promise.all([
      responsePromise,
      form.locator("button[type=submit]").click(),
    ]);
  });
});
