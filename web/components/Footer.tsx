import { formatSocialLabel } from "@/lib/socialLinks";
import type { ContactInfo, SocialLink } from "@/lib/sanity/types";

type FooterProps = Readonly<{
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
}>;

export default function Footer({ contactInfo, socialLinks }: FooterProps) {
  const phone = contactInfo?.phone;
  const email = contactInfo?.email;
  const address = contactInfo?.address;
  const cityState = [address?.city, address?.state].filter(Boolean).join(", ");
  const cityStateZip = [cityState, address?.zip].filter(Boolean).join(" ");
  const hasAddress = Boolean(address?.street || cityStateZip);
  const filteredSocialLinks = (socialLinks ?? []).filter((link) => link.url);
  const hasSocialLinks = filteredSocialLinks.length > 0;
  const hasContactDetails = Boolean(phone || email || hasAddress || hasSocialLinks);

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

          {hasContactDetails && (
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Contact
              </h3>
              <div className="mt-2 space-y-2 text-sm text-muted">
                {phone && <div>Phone: {phone}</div>}
                {email && <div>Email: {email}</div>}
                {hasAddress && (
                  <div>
                    <div>Address:</div>
                    <div>
                      {address?.street && (
                        <>
                          {address.street}
                          {cityStateZip && <br />}
                        </>
                      )}
                      {cityStateZip}
                    </div>
                  </div>
                )}
                {hasSocialLinks && (
                  <div>
                    <div>Social:</div>
                    <div className="flex flex-wrap gap-3">
                      {filteredSocialLinks.map((link) => (
                        <a
                          key={link._key ?? `${link.platform}-${link.url}`}
                          href={link.url}
                          className="underline underline-offset-4 transition-colors hover:text-foreground"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {formatSocialLabel(link.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
