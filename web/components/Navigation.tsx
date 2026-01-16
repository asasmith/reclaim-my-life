"use client";

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
    <header className="bg-white shadow-sm dark:bg-zinc-900">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-500">
              Reclaim My Life
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === link.href
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
          <div className="border-t border-slate-200 py-4 dark:border-slate-700 md:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-md px-4 py-2 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
