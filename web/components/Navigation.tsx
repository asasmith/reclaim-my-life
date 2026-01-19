"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[color:var(--color-background)] shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Image
                src="/reclaiming_my_life_text_logo.svg"
                alt="Reclaim My Life"
                width={240}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[color:var(--color-accent)] ${
                  pathname === link.href
                    ? "text-[color:var(--color-primary)]"
                    : "text-[color:var(--color-muted)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="rounded-full bg-[color:var(--color-accent)] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-secondary)]"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/register"
              className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-secondary)]"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-md p-2 text-[color:var(--color-muted)] hover:bg-[color:var(--color-surface)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-[color:var(--color-border)] py-4 md:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-md px-4 py-2 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]"
                      : "text-[color:var(--color-muted)] hover:bg-[color:var(--color-surface)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
