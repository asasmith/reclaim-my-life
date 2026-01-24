import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import PortableText from "@/components/PortableText";
import SanityImage from "@/components/SanityImage";
import { getHomePage } from "@/lib/sanity/queries";

export const revalidate = 3600;

// Generate dynamic metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const homePage = await getHomePage({ preview: isEnabled });

  if (!homePage?.seo) {
    return {
      title: "Reclaim My Life",
      description: "A safe, supportive environment for recovery and personal growth",
    };
  }

  return {
    title: homePage.seo.metaTitle || "Reclaim My Life",
    description:
      homePage.seo.metaDescription ||
      "A safe, supportive environment for recovery and personal growth",
    openGraph: {
      title: homePage.seo.metaTitle || "Reclaim My Life",
      description: homePage.seo.metaDescription || "",
      images: homePage.seo.ogImage?.asset?.url
        ? [homePage.seo.ogImage.asset.url]
        : [],
    },
  };
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  const homePage = await getHomePage({ preview: isEnabled });

  // Error handling: Show message if content not available
  if (!homePage) {
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {homePage.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl lg:mx-0">
                {homePage.hero.subtitle}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] lg:row-span-2">
              <SanityImage
                image={homePage.hero.image}
                fill
                className="rounded-lg object-cover shadow-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Hero CTAs */}
            <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:mt-10 lg:items-start lg:justify-start">
              <Link
                href={homePage.hero.primaryButton.url}
                className="w-full sm:w-auto rounded-full bg-accent px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-accent-secondary"
              >
                {homePage.hero.primaryButton.text}
              </Link>
              {homePage.hero.secondaryButton && (
                <Link
                  href={homePage.hero.secondaryButton.url}
                  className="w-full sm:w-auto rounded-full border-2 border-accent px-8 py-3 text-center text-lg font-semibold text-accent transition-colors hover:bg-surface"
                >
                  {homePage.hero.secondaryButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground">
            {homePage.mission.title}
          </h2>
          <div className="mt-8">
            <PortableText value={homePage.mission.content} />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-background">
            {homePage.ctaSection.title}
          </h2>
          <p className="mt-4 text-xl text-background/80">
            {homePage.ctaSection.subtitle}
          </p>
          <Link
            href={homePage.ctaSection.button.url}
            className="mt-8 inline-block rounded-full bg-background px-8 py-3 text-lg font-semibold text-primary transition-colors hover:bg-surface"
          >
            {homePage.ctaSection.button.text}
          </Link>
        </div>
      </section>
    </div>
  );
}
