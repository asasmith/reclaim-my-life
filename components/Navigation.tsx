"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-sm dark:bg-zinc-900">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-500">
              Reclaim My Life
            </Link>
          </div>

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

          {/* Mobile menu button - placeholder for future mobile menu */}
          <div className="md:hidden">
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
