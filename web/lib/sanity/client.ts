import { createClient } from 'next-sanity';

const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  perspective: 'published' as const,
};

export const client = createClient(clientConfig);

export function getClient(options?: { preview?: boolean }) {
  if (options?.preview) {
    return createClient({
      ...clientConfig,
      useCdn: false,
      perspective: 'previewDrafts',
    });
  }

  return client;
}
