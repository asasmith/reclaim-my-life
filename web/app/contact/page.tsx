import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const contactPage = await getContactPage({ preview: isEnabled });

  if (!contactPage?.seo) {
    return {
      title: "Contact Us - Reclaim My Life",
      description: "Get in touch with us. We are here to help 24/7.",
    };
  }

  return {
    title: contactPage.seo.metaTitle || "Contact Us - Reclaim My Life",
    description:
      contactPage.seo.metaDescription || "Get in touch with us. We are here to help 24/7.",
    openGraph: {
      title: contactPage.seo.metaTitle || "Contact Us - Reclaim My Life",
      description: contactPage.seo.metaDescription || "",
      images: contactPage.seo.ogImage?.asset?.url
        ? [contactPage.seo.ogImage.asset.url]
        : [],
    },
  };
}

export default async function Contact() {
  const { isEnabled } = await draftMode();
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage({ preview: isEnabled }),
    getSiteSettings({ preview: isEnabled }),
  ]);

  if (!contactPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-background)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[color:var(--color-foreground)]">
            Content not available
          </h1>
          <p className="mt-2 text-[color:var(--color-muted)]">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }

  const contactInfo = siteSettings?.contactInfo;

  return (
    <div className="bg-[color:var(--color-background)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[color:var(--color-foreground)]">
          {contactPage.title}
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-[color:var(--color-muted)]">
              {contactPage.introText}
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo?.phone && (
                <div>
                  <h3 className="font-semibold text-[color:var(--color-foreground)]">
                    Phone
                  </h3>
                  <p className="text-[color:var(--color-muted)]">{contactInfo.phone}</p>
                </div>
              )}

              {contactInfo?.email && (
                <div>
                  <h3 className="font-semibold text-[color:var(--color-foreground)]">
                    Email
                  </h3>
                  <p className="text-[color:var(--color-muted)]">{contactInfo.email}</p>
                </div>
              )}

              {contactInfo?.address && (
                <div>
                  <h3 className="font-semibold text-[color:var(--color-foreground)]">
                    Address
                  </h3>
                  <p className="text-[color:var(--color-muted)]">
                    {contactInfo.address.street}
                    <br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-[color:var(--color-foreground)]">Hours</h3>
                <p className="text-[color:var(--color-muted)]">24/7 Support Available</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[color:var(--color-surface)] p-8">
            <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">
              {contactPage.formTitle}
            </h2>
            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[color:var(--color-muted)]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[color:var(--color-muted)]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[color:var(--color-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-[color:var(--color-foreground)]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[color:var(--color-accent)] px-4 py-2 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-secondary)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
