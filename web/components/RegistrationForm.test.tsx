import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "@/components/RegistrationForm";
import { render, screen, waitFor } from "@/tests/helpers/test-utils";

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/First Name/), "John");
  await user.type(screen.getByLabelText(/Last Name/), "Doe");
  await user.type(screen.getByLabelText(/Email/), "john.doe@example.com");
  await user.type(screen.getByLabelText(/Phone Number/), "5551234567");
  await user.type(screen.getByLabelText(/Date of Birth/), "1990-01-01");
  await user.type(screen.getByLabelText(/Emergency Contact Name/), "Jane Doe");
  await user.type(screen.getByLabelText(/Emergency Contact Phone/), "5559876543");
};

describe("RegistrationForm", () => {
  it("renders all form sections", () => {
    render(<RegistrationForm />);

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Emergency Contact")).toBeInTheDocument();
    expect(screen.getByText("Additional Information")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Registration" })
    ).toBeInTheDocument();
  });

  it("submits the form and resets values", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    render(<RegistrationForm />);

    await fillRequiredFields(user);
    await user.selectOptions(screen.getByLabelText("How did you hear about us?"), "search");
    await user.type(
      screen.getByLabelText("Additional Information or Questions"),
      "Looking forward to learning more."
    );

    await user.click(screen.getByRole("button", { name: "Submit Registration" }));

    expect(screen.getByRole("button", { name: "Submitting..." })).toBeDisabled();
    expect(await screen.findByText("Thank you for your registration! We'll contact you within 24 hours.", {}, { timeout: 2000 })).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("Thank you for your registration! We'll contact you within 24 hours.")).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name/)).toHaveValue("");
        expect(screen.getByLabelText(/Last Name/)).toHaveValue("");
        expect(screen.getByLabelText(/Email/)).toHaveValue("");
        expect(screen.getByLabelText(/Phone Number/)).toHaveValue("");
        expect(screen.getByLabelText(/Date of Birth/)).toHaveValue("");
        expect(screen.getByLabelText(/Emergency Contact Name/)).toHaveValue("");
        expect(screen.getByLabelText(/Emergency Contact Phone/)).toHaveValue("");
        expect(screen.getByLabelText("How did you hear about us?")).toHaveValue("");
        expect(screen.getByLabelText("Additional Information or Questions")).toHaveValue("");
      },
      { timeout: 2000 }
    );

    consoleSpy.mockRestore();
  });

  it("shows an error message when submission fails", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {
      throw new Error("submit failed");
    });
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(<RegistrationForm />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Submit Registration" }));

    expect(
      await screen.findByText(
        "There was an error submitting your registration. Please try again or contact us directly."
      )
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
