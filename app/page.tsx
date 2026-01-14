import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
              Reclaim Your Life
            </h1>
            <p className="mt-6 text-xl text-slate-700 dark:text-slate-300">
              A safe, supportive environment for recovery and personal growth
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Start Your Journey
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-slate-800"
              >
                Contact Us
              </Link>
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
