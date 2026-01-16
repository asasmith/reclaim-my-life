import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'general',
      title: 'General Info',
    },
    {
      name: 'contact',
      title: 'Contact Information',
    },
    {
      name: 'social',
      title: 'Social Media',
    },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'Your organization name (appears in browser tab and search results)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
      description: 'Short description of your mission (used for SEO)',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Details',
      type: 'object',
      group: 'contact',
      description: 'How people can reach you',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Main contact phone number (e.g., (555) 123-4567)',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          description: 'Main contact email address',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'address',
          title: 'Physical Address',
          type: 'object',
          description: 'Your facility location',
          fields: [
            { name: 'street', title: 'Street Address', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'state', title: 'State', type: 'string' },
            { name: 'zip', title: 'ZIP Code', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      description: 'Add links to your social media profiles. These appear in the footer.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'Choose the social media platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              description: 'Full URL to your profile (e.g., https://facebook.com/yourpage)',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform || 'Untitled',
                subtitle: url || 'No URL',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: 'Site Settings',
        subtitle: title || 'Not configured yet',
      };
    },
  },
});
