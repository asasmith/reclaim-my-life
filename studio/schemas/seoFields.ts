import { defineField } from 'sanity';

// Reusable SEO fields object for consistency across all pages
export const seoFields = defineField({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  description: 'Settings for search engines (Google, Bing, etc.) and social media sharing',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Appears in Google search results and browser tabs (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Brief summary for search results (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when page is shared on Facebook, Twitter, etc. (1200×630 pixels recommended)',
    }),
  ],
});
