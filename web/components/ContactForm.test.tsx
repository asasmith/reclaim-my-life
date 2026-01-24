import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { render, screen, waitFor } from "@/tests/helpers/test-utils";

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/Name/), "Jane Doe");
  await user.type(screen.getByLabelText(/Message/), "Hello there.");
};

const fillRequiredFieldsWithEmail = async (user: ReturnType<typeof userEvent.setup>) => {
  await fillRequiredFields(user);
  await user.type(screen.getByLabelText(/Email/), "jane.doe@example.com");
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("renders contact form fields", () => {
    render(<ContactForm formTitle="Reach Out" />);

    expect(screen.getByText("Reach Out")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it("requires either email or phone", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });

    vi.stubGlobal("fetch", fetchSpy);

    render(<ContactForm formTitle="Reach Out" />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    const errorMessage = await screen.findByText("Please provide an email or phone number.");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("id", "contact-info-error");

    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Email/)).toHaveAttribute(
      "aria-describedby",
      "contact-info-error"
    );
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute(
      "aria-describedby",
      "contact-info-error"
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("clears contact info validation error when email or phone changes", async () => {
    const user = userEvent.setup();

    render(<ContactForm formTitle="Reach Out" />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Please provide an email or phone number.")).toBeInTheDocument();

    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText(/Phone/), "555-123-4567");

    await waitFor(() => {
      expect(screen.queryByText("Please provide an email or phone number.")).toBeNull();
      expect(screen.getByLabelText(/Email/)).not.toHaveAttribute("aria-invalid");
      expect(screen.getByLabelText(/Phone/)).not.toHaveAttribute("aria-invalid");
    });
  });

  it("submits the form and shows success message", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true });

    vi.stubGlobal("fetch", fetchSpy);

    const { container } = render(<ContactForm formTitle="Reach Out" />);

    await fillRequiredFieldsWithEmail(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByText("Thanks for reaching out.")).toBeInTheDocument();
      expect(screen.getByText("We will respond within one business day.")).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Name/)).toHaveValue("");
    expect(screen.getByLabelText(/Email/)).toHaveValue("");
    expect(screen.getByLabelText(/Phone/)).toHaveValue("");
    expect(screen.getByLabelText(/Message/)).toHaveValue("");
    expect(container.querySelector("div[data-netlify-recaptcha=\"true\"]")).toBeNull();

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body as string;

    expect(requestBody).toContain("form-name=contact");
    expect(requestBody).toContain("name=Jane+Doe");
    expect(requestBody).toContain("email=jane.doe%40example.com");
    expect(requestBody).toContain("phone=");
    expect(requestBody).toContain("message=Hello+there.");
  });

  it("shows an error message when submission fails", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.fn().mockResolvedValue({ ok: false });
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    vi.stubGlobal("fetch", fetchSpy);

    render(<ContactForm formTitle="Reach Out" />);

    await fillRequiredFieldsWithEmail(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(
        "We could not send your message. Please try again or contact us directly."
      )
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it("includes Netlify form attributes", () => {
    const { container } = render(<ContactForm formTitle="Reach Out" />);

    const form = container.querySelector("form");

    expect(form).toHaveAttribute("data-netlify", "true");
    expect(form).toHaveAttribute("data-netlify-honeypot", "bot-field");
    expect(form).toHaveAttribute("data-netlify-recaptcha", "true");
    expect(screen.getByDisplayValue("contact")).toHaveAttribute("name", "form-name");
    expect(screen.getByDisplayValue("contact")).toHaveAttribute("type", "hidden");
  });
});
