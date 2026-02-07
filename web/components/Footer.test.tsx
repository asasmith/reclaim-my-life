import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";
import { render, screen } from "@/tests/helpers/test-utils";

describe("Footer", () => {
  it("renders key footer content", () => {
    render(
      <Footer
        contactInfo={{
          phone: "(555) 123-4567",
          email: "info@reclaimmylife.org",
          address: {
            street: "123 Main St",
            city: "Denver",
            state: "CO",
            zip: "80202",
          },
        }}
        socialLinks={[
          {
            _key: "social-facebook",
            platform: "facebook",
            url: "https://facebook.com/reclaim",
          },
        ]}
      />
    );

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
        socialLinks={[]}
      />
    );

    expect(screen.getByText("Phone: (555) 123-4567")).toBeInTheDocument();
    expect(screen.queryByText(/Email:/)).toBeNull();
    expect(screen.queryByText("Address:")).toBeNull();
    expect(screen.queryByText("Social:")).toBeNull();
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
        socialLinks={[]}
      />
    );

    expect(screen.queryByText(/Phone:/)).toBeNull();
    expect(screen.queryByText(/Email:/)).toBeNull();
    expect(screen.queryByText("Contact")).toBeNull();
  });

  it("renders address and social links when present", () => {
    render(
      <Footer
        contactInfo={{
          phone: "",
          email: "",
          address: {
            street: "456 Elm St",
            city: "Austin",
            state: "TX",
            zip: "78701",
          },
        }}
        socialLinks={[
          {
            _key: "social-instagram",
            platform: "instagram",
            url: "https://instagram.com/reclaim",
          },
          {
            _key: "social-unsafe",
            platform: "facebook",
            url: "javascript:alert('nope')",
          },
        ]}
      />
    );

    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText(/456 Elm St/)).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX 78701/)).toBeInTheDocument();
    expect(screen.getByText("Social:")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Facebook" })).toBeNull();
  });
});
