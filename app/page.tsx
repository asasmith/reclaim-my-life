import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                Reclaim Your Life
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-700 dark:text-slate-300 lg:mx-0">
                A safe, supportive environment for recovery and personal growth
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
                <Link
                  href="/register"
                  className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto rounded-full border-2 border-blue-600 px-8 py-3 text-center text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-slate-800"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&q=80"
                alt="Peaceful recovery environment with natural sunlight"
                fill
                priority
                className="rounded-lg object-cover shadow-2xl"
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
            Our Mission
          </h2>
          <div className="mt-8 space-y-6 text-lg text-slate-700 dark:text-slate-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
              cillum dolore eu fugiat nulla pariatur.
            </p>

            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
              natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo.
            </p>

            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
              dolore magnam aliquam quaerat voluptatem.
            </p>

            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
              laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure 
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join our supportive community and start your journey to recovery today.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
