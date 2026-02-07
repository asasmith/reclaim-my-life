import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactPage from "@/app/contact/page";
import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";
import type { ContactPage as ContactPageType, SiteSettings } from "@/lib/sanity/types";
import { render, screen } from "@/tests/helpers/test-utils";

vi.mock("@/components/ContactForm", () => ({
  default: () => <div>ContactForm</div>,
}));

vi.mock("next/headers", () => ({
  draftMode: vi.fn().mockResolvedValue({ isEnabled: false }),
}));

vi.mock("@/lib/sanity/queries", () => ({
  getContactPage: vi.fn(),
  getSiteSettings: vi.fn(),
}));

const baseContactPage: ContactPageType = {
  _id: "contactPage",
  _type: "contactPage",
  title: "Contact Us",
  introText: "Reach out any time.",
  formTitle: "Send a Message",
};

const emptyAddress = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

const baseSiteSettings: SiteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Reclaim My Life",
  contactInfo: {
    phone: "",
    email: "",
    address: emptyAddress,
  },
};

beforeEach(() => {
  vi.mocked(getContactPage).mockResolvedValue(baseContactPage);
  vi.mocked(getSiteSettings).mockResolvedValue(baseSiteSettings);
});

describe("Contact page", () => {
  it("renders only the provided contact details", async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({
      ...baseSiteSettings,
      contactInfo: {
        phone: "(555) 123-4567",
        email: "",
        address: emptyAddress,
      },
    });

    const page = await ContactPage();
    render(page);

    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("(555) 123-4567")).toBeInTheDocument();
    expect(screen.queryByText("Email")).toBeNull();
  });

  it("renders address parts without placeholders", async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({
      ...baseSiteSettings,
      contactInfo: {
        phone: "",
        email: "",
        address: {
          street: "",
          city: "Austin",
          state: "TX",
          zip: "78701",
        },
      },
    });

    const page = await ContactPage();
    render(page);

    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Austin, TX 78701")).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).toBeNull();
  });

  it("renders social links when available", async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({
      ...baseSiteSettings,
      socialLinks: [
        {
          platform: "facebook",
          url: "https://facebook.com/reclaim",
        },
        {
          platform: "instagram",
          url: "https://instagram.com/reclaim",
        },
      ],
    });

    const page = await ContactPage();
    render(page);

    expect(screen.getByText("Social")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://facebook.com/reclaim"
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://instagram.com/reclaim"
    );
  });
});
