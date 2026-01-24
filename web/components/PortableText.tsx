import {
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextComponentProps,
  PortableText as PortableTextComponent,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

type Props = {
  value: PortableTextBlock[];
};

type LinkMark = {
  _type: "link";
  href?: string;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-6 text-lg text-muted">
        {children}
      </p>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="mb-3 mt-6 text-xl font-bold text-foreground">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-muted">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="pl-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextMarkComponentProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: PortableTextMarkComponentProps) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline transition-colors hover:text-accent-secondary"
          >
            {children}
          </a>
        );
      }

        return (
          <Link
            href={href}
            className="text-accent underline transition-colors hover:text-accent-secondary"
          >
            {children}
          </Link>
        );
    },
  },
};

export default function PortableText({ value }: Props) {
  return <PortableTextComponent value={value} components={components} />;
}
