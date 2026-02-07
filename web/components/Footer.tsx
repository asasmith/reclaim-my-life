import type { ContactInfo } from "@/lib/sanity/types";

type FooterProps = Readonly<{
  contactInfo?: ContactInfo;
}>;

export default function Footer({ contactInfo }: FooterProps) {
  const phone = contactInfo?.phone;
  const email = contactInfo?.email;
  const hasContactInfo = Boolean(phone || email);

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
            {hasContactInfo ? (
              <p className="mt-2 text-sm text-muted">
                {phone && <>Phone: {phone}</>}
                {phone && email && <br />}
                {email && <>Email: {email}</>}
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Contact details coming soon.
              </p>
            )}
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
