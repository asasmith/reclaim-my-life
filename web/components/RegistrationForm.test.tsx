import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "@/components/RegistrationForm";
import { render, screen, waitFor } from "@/tests/helpers/test-utils";

const thankYou = {
  title: "Thanks for reaching out",
  message: "We will respond within one business day.",
};

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/Name/, { selector: "#name" }), "John Doe");
  await user.type(screen.getByLabelText(/Date of Birth/), "1990-01-01");
  await user.type(screen.getByLabelText(/Phone Number/), "555-123-4567");
  await user.type(
    screen.getByLabelText(/My drug\(s\) of choice/),
    "Alcohol"
  );
  await user.click(screen.getByLabelText("Yes", { selector: "input[name=\"drug-addict-alcoholic\"]" }));
  await user.click(screen.getByLabelText("No", { selector: "input[name=\"sex-offender\"]" }));
  await user.type(screen.getByLabelText(/Emergency Contact Name/), "Jane Doe");
  await user.click(
    screen.getByLabelText(/I understand that Twelve-Step Recovery is a MUST to stay here/)
  );
  await user.type(screen.getByLabelText(/Today's Date/), "2026-02-27");
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("RegistrationForm", () => {
  it("renders the registration fields", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/Name/, { selector: "#name" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/My drug\(s\) of choice/)).toBeInTheDocument();
    expect(screen.getByText(/I am a drug addict or an alcoholic/)).toBeInTheDocument();
    expect(screen.getByText(/Sex Offender/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Medications, including doses, I am currently taking/)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Upcoming court dates, probation, drug court, pre-trial, etc/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Emergency Contact Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Emergency Contact Phone/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I understand that Twelve-Step Recovery is a MUST to stay here/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Today's Date/)).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });

    vi.stubGlobal("fetch", fetchSpy);

    const { container } = render(<RegistrationForm thankYou={thankYou} />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Submit Registration" }));

    await waitFor(() => {
      expect(screen.getByText(thankYou.title)).toBeInTheDocument();
      expect(screen.getByText(thankYou.message)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Name/, { selector: "#name" })).toHaveValue("");
    expect(screen.getByLabelText(/Date of Birth/)).toHaveValue("");
    expect(screen.getByLabelText(/Phone Number/)).toHaveValue("");
    expect(screen.getByLabelText(/My drug\(s\) of choice/)).toHaveValue("");
    expect(screen.getByLabelText(/Emergency Contact Name/)).toHaveValue("");
    expect(
      screen.getByLabelText(/I understand that Twelve-Step Recovery is a MUST to stay here/)
    ).not.toBeChecked();
    expect(screen.getByLabelText(/Today's Date/)).toHaveValue("");
    expect(container.querySelector("div[data-netlify-recaptcha=\"true\"]")).toBeNull();

    expect(fetchSpy).toHaveBeenCalledWith(
      "/netlify-forms.html",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: expect.stringContaining("form-name=registration"),
      })
    );

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body as string;

    expect(requestBody).toContain("name=John+Doe");
    expect(requestBody).toContain("date-of-birth=1990-01-01");
    expect(requestBody).toContain("phone-number=555-123-4567");
    expect(requestBody).toContain("drug-of-choice=Alcohol");
    expect(requestBody).toContain("drug-addict-alcoholic=Yes");
    expect(requestBody).toContain("sex-offender=No");
    expect(requestBody).toContain("emergency-contact-name=Jane+Doe");
    expect(requestBody).toContain("twelve-step-agreement=yes");
    expect(requestBody).toContain("todays-date=2026-02-27");
  });

  it("shows an error message when submission fails", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn(async () => ({ ok: false }));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    vi.stubGlobal("fetch", fetchSpy);

    render(<RegistrationForm />);

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
    const { container } = render(<RegistrationForm />);

    const form = container.querySelector("form");

    expect(form).toHaveAttribute("data-netlify", "true");
    expect(form).toHaveAttribute("data-netlify-honeypot", "bot-field");
    expect(screen.getByDisplayValue("registration")).toHaveAttribute("name", "form-name");
    expect(screen.getByDisplayValue("registration")).toHaveAttribute("type", "hidden");
  });
});
