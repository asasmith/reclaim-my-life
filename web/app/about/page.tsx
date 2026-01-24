import type { Metadata } from "next";
import { draftMode } from "next/headers";
import PortableText from "@/components/PortableText";
import { getAboutPage } from "@/lib/sanity/queries";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const aboutPage = await getAboutPage({ preview: isEnabled });

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
  const { isEnabled } = await draftMode();
  const aboutPage = await getAboutPage({ preview: isEnabled });

  if (!aboutPage) {
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

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">{aboutPage.title}</h1>

        <div className="mt-8">
          <PortableText value={aboutPage.content} />
        </div>
      </div>
    </div>
  );
}
