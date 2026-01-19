import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Navigation from "@/components/Navigation";
import { render, screen } from "@/tests/helpers/test-utils";
import { usePathname } from "next/navigation";

const mockUsePathname = vi.mocked(usePathname);

describe("Navigation", () => {
  it("renders primary navigation links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    expect(screen.getByText("Reclaim My Life")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("highlights the active link", () => {
    mockUsePathname.mockReturnValue("/contact");
    render(<Navigation />);

    const contactLink = screen.getByText("Contact");
    expect(contactLink.className).toContain("text-[color:var(--color-primary)]");
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    expect(screen.queryByRole("link", { name: "Home" })).toBeInTheDocument();

    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    await user.click(toggleButton);

    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);

    await user.click(toggleButton);
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);
  });

  it("closes the mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/");
    render(<Navigation />);

    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    await user.click(toggleButton);

    const mobileAboutLink = screen.getAllByRole("link", { name: "About" })[1];
    await user.click(mobileAboutLink);

    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(1);
  });
});
