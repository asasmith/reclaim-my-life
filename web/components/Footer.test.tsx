import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";
import { render, screen } from "@/tests/helpers/test-utils";

describe("Footer", () => {
  it("renders key footer content", () => {
    render(<Footer />);

    expect(screen.getByText("Reclaim My Life")).toBeInTheDocument();
    expect(
      screen.getByText("A safe, supportive environment for recovery and growth.")
    ).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support Available")).toBeInTheDocument();
  });

  it("shows the current year", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    const copyright = screen.getByText(/Reclaim My Life\. All rights reserved\./);
    expect(copyright).toHaveTextContent(year.toString());
  });

  it("renders only the provided contact details", () => {
    render(
      <Footer
        contactInfo={{
          phone: "(555) 123-4567",
          email: "",
          address: {
            street: "",
            city: "",
            state: "",
            zip: "",
          },
        }}
      />
    );

    expect(screen.getByText("Phone: (555) 123-4567")).toBeInTheDocument();
    expect(screen.queryByText(/Email:/)).toBeNull();
  });

  it("omits the contact block when details are missing", () => {
    render(
      <Footer
        contactInfo={{
          phone: "",
          email: "",
          address: {
            street: "",
            city: "",
            state: "",
            zip: "",
          },
        }}
      />
    );

    expect(screen.queryByText(/Phone:/)).toBeNull();
    expect(screen.queryByText(/Email:/)).toBeNull();
  });
});
