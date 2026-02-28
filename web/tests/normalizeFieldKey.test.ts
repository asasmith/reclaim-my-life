import { describe, expect, it } from "vitest";
import { normalizeFieldKey } from "../../shared/normalizeFieldKey.mjs";

describe("normalizeFieldKey", () => {
  it("normalizes labels to field keys", () => {
    expect(normalizeFieldKey("Date of Birth")).toBe("date-of-birth");
    expect(normalizeFieldKey("Today's Date")).toBe("todays-date");
    expect(normalizeFieldKey("Emergency Contact Phone")).toBe("emergency-contact-phone");
  });
});
