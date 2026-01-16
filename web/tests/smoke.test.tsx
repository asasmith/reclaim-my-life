import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/helpers/test-utils";

// Simple smoke test to verify testing infrastructure works
describe("Testing Infrastructure", () => {
  it("should render a simple component", () => {
    const TestComponent = () => <div>Hello, tests!</div>;
    render(<TestComponent />);
    expect(screen.getByText("Hello, tests!")).toBeInTheDocument();
  });

  it("should support basic assertions", () => {
    expect(1 + 1).toBe(2);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
