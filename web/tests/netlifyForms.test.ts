import { describe, expect, it } from "vitest";
import { buildNetlifyFormsHtml, normalizeFieldKey } from "../scripts/netlifyForms.mjs";

describe("netlify forms generator", () => {
  it("normalizes field keys consistently", () => {
    expect(normalizeFieldKey("Date of Birth")).toBe("date-of-birth");
    expect(normalizeFieldKey("Today's Date")).toBe("todays-date");
    expect(normalizeFieldKey("Emergency Contact Phone")).toBe("emergency-contact-phone");
  });

  it("includes contact and registration fields", () => {
    const html = buildNetlifyFormsHtml(["First Name", "Program Interest"]);

    expect(html).toContain('name="contact"');
    expect(html).toContain('name="registration"');
    expect(html).toContain('name="name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="phone"');
    expect(html).toContain('name="message"');

    expect(html).toContain('name="first-name"');
    expect(html).toContain('name="program-interest"');
  });

  it("throws when registration fields are missing", () => {
    expect(() => buildNetlifyFormsHtml([])).toThrow(
      "Registration fields are required to generate Netlify forms."
    );
  });
});
