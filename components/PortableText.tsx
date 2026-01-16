import { PortableText as PortableTextComponent } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Link from 'next/link';

type Props = {
  value: PortableTextBlock[];
};

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 text-lg text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: any) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');
      
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link
          href={href}
          className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
