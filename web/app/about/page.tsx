import PortableText from "@/components/PortableText";
import { getAboutPage } from "@/lib/sanity/queries";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  if (!aboutPage?.seo) {
    return {
      title: "About Us - Reclaim My Life",
      description: "Learn about our mission, values, and approach to supporting recovery.",
    };
  }

  return {
    title: aboutPage.seo.metaTitle || "About Us - Reclaim My Life",
    description:
      aboutPage.seo.metaDescription ||
      "Learn about our mission, values, and approach to supporting recovery.",
    openGraph: {
      title: aboutPage.seo.metaTitle || "About Us - Reclaim My Life",
      description: aboutPage.seo.metaDescription || "",
      images: aboutPage.seo.ogImage?.asset?.url
        ? [aboutPage.seo.ogImage.asset.url]
        : [],
    },
  };
}

export default async function About() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
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

  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          {aboutPage.title}
        </h1>

        <div className="mt-8">
          <PortableText value={aboutPage.content} />
        </div>
      </div>
    </div>
  );
}
