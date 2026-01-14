export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Reclaim My Life
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              A safe, supportive environment for recovery and growth.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Contact
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Phone: (555) 123-4567
              <br />
              Email: info@reclaimmylife.org
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Hours
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              24/7 Support Available
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Reclaim My Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
