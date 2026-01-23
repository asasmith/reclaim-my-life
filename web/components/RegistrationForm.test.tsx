import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "@/components/RegistrationForm";
import { render, screen, waitFor } from "@/tests/helpers/test-utils";
import type { RegisterFormField } from "@/lib/sanity/types";

const formFields: RegisterFormField[] = [
  {
    fieldKey: "first-name",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    fieldKey: "last-name",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    fieldKey: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    fieldKey: "contact-method",
    label: "Preferred Contact Method",
    type: "select",
    options: ["Phone", "Email"],
    required: true,
  },
  {
    fieldKey: "program-interest",
    label: "Program Interest",
    type: "radio",
    options: ["Residential", "Outpatient"],
  },
  {
    fieldKey: "consent",
    label: "I agree to be contacted",
    type: "checkbox",
    required: true,
  },
  {
    fieldKey: "notes",
    label: "Notes",
    type: "textarea",
  },
];

const thankYou = {
  title: "Thanks for reaching out",
  message: "We will respond within one business day.",
};

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/First Name/), "John");
  await user.type(screen.getByLabelText(/Last Name/), "Doe");
  await user.type(screen.getByLabelText(/Email/), "john.doe@example.com");
  await user.selectOptions(screen.getByLabelText(/Preferred Contact Method/), "Phone");
  await user.click(screen.getByLabelText(/I agree to be contacted/));
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("RegistrationForm", () => {
  it("renders fields from Sanity", () => {
    render(<RegistrationForm formFields={formFields} />);

    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Contact Method/)).toBeInTheDocument();
    expect(screen.getByText(/Program Interest/)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to be contacted/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/)).toBeInTheDocument();
  });

  it("shows preview loading state when draft fields are missing", () => {
    render(<RegistrationForm formFields={null} isPreview />);

    expect(screen.getByText("Loading draft form fields...")).toBeInTheDocument();
  });

  it("shows empty state when no fields are configured", () => {
    render(<RegistrationForm formFields={[]} />);

    expect(
      screen.getByText("Form fields are empty. Please add fields in the Register Page document.")
    ).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });

    vi.stubGlobal("fetch", fetchSpy);

    const { container } = render(<RegistrationForm formFields={formFields} thankYou={thankYou} />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Submit Registration" }));

    await waitFor(() => {
      expect(screen.getByText(thankYou.title)).toBeInTheDocument();
      expect(screen.getByText(thankYou.message)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/First Name/)).toHaveValue("");
    expect(screen.getByLabelText(/Last Name/)).toHaveValue("");
    expect(screen.getByLabelText(/Email/)).toHaveValue("");
    expect(screen.getByLabelText(/Preferred Contact Method/)).toHaveValue("");
    expect(screen.getByLabelText(/I agree to be contacted/)).not.toBeChecked();
    expect(container.querySelector("div[data-netlify-recaptcha=\"true\"]")).toBeNull();

    expect(fetchSpy).toHaveBeenCalledWith(
      "/",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: expect.stringContaining("form-name=registration"),
      })
    );

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body as string;

    expect(requestBody).toContain("first-name=John");
    expect(requestBody).toContain("last-name=Doe");
    expect(requestBody).toContain("email=john.doe%40example.com");
    expect(requestBody).toContain("contact-method=Phone");
    expect(requestBody).toContain("consent=yes");
  });

  it("shows an error message when submission fails", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn(async () => ({ ok: false }));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    vi.stubGlobal("fetch", fetchSpy);

    render(<RegistrationForm formFields={formFields} />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Submit Registration" }));

    expect(
      await screen.findByText(
        "We couldn't submit your registration. Please try again or contact us directly."
      )
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it("includes Netlify form attributes", () => {
    const { container } = render(<RegistrationForm formFields={formFields} />);

    const form = container.querySelector("form");

    expect(form).toHaveAttribute("data-netlify", "true");
    expect(form).toHaveAttribute("data-netlify-honeypot", "bot-field");
    expect(form).toHaveAttribute("data-netlify-recaptcha", "true");
    expect(screen.getByDisplayValue("registration")).toHaveAttribute("name", "form-name");
    expect(screen.getByDisplayValue("registration")).toHaveAttribute("type", "hidden");
  });
});
