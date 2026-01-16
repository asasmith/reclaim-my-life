import { getHomePage } from '@/lib/sanity/queries';
import SanityImage from '@/components/SanityImage';
import PortableText from '@/components/PortableText';
import Link from 'next/link';
import type { Metadata } from 'next';

// ISR: Revalidate every 5 minutes (300 seconds)
// Future: Will increase to 1 hour (3600) and add webhook revalidation
export const revalidate = 3600;

// Generate dynamic metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  if (!homePage?.seo) {
    return {
      title: 'Reclaim My Life',
      description: 'A safe, supportive environment for recovery and personal growth',
    };
  }

  return {
    title: homePage.seo.metaTitle || 'Reclaim My Life',
    description:
      homePage.seo.metaDescription ||
      'A safe, supportive environment for recovery and personal growth',
    openGraph: {
      title: homePage.seo.metaTitle || 'Reclaim My Life',
      description: homePage.seo.metaDescription || '',
      images: homePage.seo.ogImage?.asset?.url
        ? [homePage.seo.ogImage.asset.url]
        : [],
    },
  };
}

export default async function Home() {
  const homePage = await getHomePage();

  // Error handling: Show message if content not available
  if (!homePage) {
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                {homePage.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-700 dark:text-slate-300 lg:mx-0">
                {homePage.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
                <Link
                  href={homePage.hero.primaryButton.url}
                  className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {homePage.hero.primaryButton.text}
                </Link>
                {homePage.hero.secondaryButton && (
                  <Link
                    href={homePage.hero.secondaryButton.url}
                    className="w-full sm:w-auto rounded-full border-2 border-blue-600 px-8 py-3 text-center text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-slate-800"
                  >
                    {homePage.hero.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px]">
              <SanityImage
                image={homePage.hero.image}
                fill
                className="rounded-lg object-cover shadow-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {homePage.mission.title}
          </h2>
          <div className="mt-8">
            <PortableText value={homePage.mission.content} />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            {homePage.ctaSection.title}
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            {homePage.ctaSection.subtitle}
          </p>
          <Link
            href={homePage.ctaSection.button.url}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            {homePage.ctaSection.button.text}
          </Link>
        </div>
      </section>
    </div>
  );
}
