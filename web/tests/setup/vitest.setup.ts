import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { createElement, type ReactNode } from "react";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    return createElement("img", props);
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: Record<string, unknown> & { children: ReactNode; href: string }) => {
    return createElement("a", { href, ...props }, children);
  },
}));
