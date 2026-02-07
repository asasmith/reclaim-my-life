import type { Metadata } from "next";
import { draftMode } from "next/headers";
import ContactForm from "@/components/ContactForm";
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
  const contactPagePromise = getContactPage({ preview: isEnabled });
  const siteSettingsPromise = getSiteSettings({ preview: isEnabled });
  const [contactPageResult, siteSettingsResult] = await Promise.allSettled([
    contactPagePromise,
    siteSettingsPromise,
  ]);
  const contactPage = contactPageResult.status === "fulfilled" ? contactPageResult.value : null;
  const siteSettings = siteSettingsResult.status === "fulfilled" ? siteSettingsResult.value : null;

  if (contactPageResult.status === "rejected") {
    console.error("Failed to load contact page content:", contactPageResult.reason);
  }

  if (siteSettingsResult.status === "rejected") {
    console.error("Failed to load site settings for contact page:", siteSettingsResult.reason);
  }

  if (!contactPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Content not available
          </h1>
          <p className="mt-2 text-muted">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }

  const contactInfo = siteSettings?.contactInfo;
  const address = contactInfo?.address;
  const cityState = [address?.city, address?.state].filter(Boolean).join(", ");
  const cityStateZip = [cityState, address?.zip].filter(Boolean).join(" ");
  const hasAddress = Boolean(address?.street || cityStateZip);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">
          {contactPage.title}
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-muted">
              {contactPage.introText}
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo?.phone && (
                <div>
                  <h3 className="font-semibold text-foreground">
                    Phone
                  </h3>
                  <p className="text-muted">{contactInfo.phone}</p>
                </div>
              )}

              {contactInfo?.email && (
                <div>
                  <h3 className="font-semibold text-foreground">
                    Email
                  </h3>
                  <p className="text-muted">{contactInfo.email}</p>
                </div>
              )}

              {hasAddress && (
                <div>
                  <h3 className="font-semibold text-foreground">
                    Address
                  </h3>
                  <p className="text-muted">
                    {address?.street && (
                      <>
                        {address.street}
                        {cityStateZip && <br />}
                      </>
                    )}
                    {cityStateZip}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-foreground">Hours</h3>
                <p className="text-muted">24/7 Support Available</p>
              </div>
            </div>
          </div>

          <ContactForm formTitle={contactPage.formTitle} />
        </div>
      </div>
    </div>
  );
}
