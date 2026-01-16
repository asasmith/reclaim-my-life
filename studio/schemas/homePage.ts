import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'mission',
      title: 'Mission Section',
    },
    {
      name: 'cta',
      title: 'Call-to-Action Section',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Content',
      type: 'object',
      group: 'hero',
      description: 'This is the first thing visitors see at the top of your homepage',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Headline',
          type: 'string',
          description:
            'Large, bold text (currently "Reclaim Your Life"). Keep it short and impactful.',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          description: 'Supporting text below the headline. 1-2 sentences works best.',
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: 'image',
          title: 'Background Image',
          type: 'image',
          description:
            'Large photo shown behind the hero text. Best size: 1600×900 pixels (landscape orientation)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description:
                'Describe the image for screen readers and SEO (e.g., "Peaceful recovery environment with natural sunlight")',
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          description: 'The main call-to-action button (currently "Start Your Journey")',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'Text shown on the button',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Where the button goes (e.g., /register)',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          description: 'Optional second button (currently "Contact Us")',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'Text shown on the button',
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Where the button goes (e.g., /contact)',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'object',
      group: 'mission',
      description: "The middle section explaining your organization's purpose",
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Heading for this section (currently "Our Mission")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'content',
          title: 'Mission Content',
          type: 'array',
          description:
            'The main text explaining your mission. You can format text, add links, and create multiple paragraphs.',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },
              ],
              lists: [
                { title: 'Bullet List', value: 'bullet' },
                { title: 'Numbered List', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Bold', value: 'strong' },
                  { title: 'Italic', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                        validation: (Rule) =>
                          Rule.uri({
                            scheme: ['http', 'https', 'mailto', 'tel'],
                          }),
                      },
                    ],
                  },
                ],
              },
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Bottom Call-to-Action',
      type: 'object',
      group: 'cta',
      description: 'The blue section at the bottom encouraging visitors to take action',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Main heading (currently "Ready to Take the Next Step?")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Supporting Text',
          type: 'text',
          description: 'Text below the heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'button',
          title: 'Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'Text shown on the button',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Where the button goes (e.g., /register)',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      description: 'Settings for search engines (Google, Bing, etc.) and social media sharing',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Page Title',
          type: 'string',
          description:
            'Appears in Google search results and browser tabs (50-60 characters recommended)',
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
          description:
            'Image shown when page is shared on Facebook, Twitter, etc. (1200×630 pixels recommended)',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
    },
    prepare({ title }) {
      return {
        title: 'Home Page',
        subtitle: title || 'Not configured yet',
      };
    },
  },
});
