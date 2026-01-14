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
});
