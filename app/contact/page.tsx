import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Reclaim My Life",
  description: "Get in touch with us. We're here to help 24/7.",
};

export default function Contact() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          Contact Us
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              We're here to answer your questions and provide support 24/7.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Phone
                </h3>
                <p className="text-slate-700 dark:text-slate-300">(555) 123-4567</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Email
                </h3>
                <p className="text-slate-700 dark:text-slate-300">info@reclaimmylife.org</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Address
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  123 Recovery Lane
                  <br />
                  Hope City, ST 12345
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Hours
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  24/7 Support Available
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-8 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Send a Message
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
