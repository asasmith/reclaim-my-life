export default function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Reclaim My Life
            </h3>
            <p className="mt-2 text-sm text-muted">
              A safe, supportive environment for recovery and growth.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Contact
            </h3>
            <p className="mt-2 text-sm text-muted">
              Phone: (555) 123-4567
              <br />
              Email: info@reclaimmylife.org
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Hours
            </h3>
            <p className="mt-2 text-sm text-muted">
              24/7 Support Available
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} Reclaim My Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
