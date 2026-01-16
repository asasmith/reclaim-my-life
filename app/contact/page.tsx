import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  if (!contactPage?.seo) {
    return {
      title: "Contact Us - Reclaim My Life",
      description: "Get in touch with us. We're here to help 24/7.",
    };
  }

  return {
    title: contactPage.seo.metaTitle || "Contact Us - Reclaim My Life",
    description:
      contactPage.seo.metaDescription || "Get in touch with us. We're here to help 24/7.",
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
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  if (!contactPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Content not available
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }

  const contactInfo = siteSettings?.contactInfo;

  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          {contactPage.title}
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              {contactPage.introText}
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo?.phone && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Phone
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">{contactInfo.phone}</p>
                </div>
              )}

              {contactInfo?.email && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Email
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">{contactInfo.email}</p>
                </div>
              )}

              {contactInfo?.address && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Address
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    {contactInfo.address.street}
                    <br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Hours</h3>
                <p className="text-slate-700 dark:text-slate-300">24/7 Support Available</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-8 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {contactPage.formTitle}
            </h2>
            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 w-full rounded-md border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-zinc-800"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-zinc-800"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-zinc-800"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
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
