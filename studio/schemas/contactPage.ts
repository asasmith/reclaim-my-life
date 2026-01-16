import { defineType, defineField } from 'sanity';
import { seoFields } from './seoFields';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading at the top of the page (currently "Contact Us")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      description: 'Text shown in the "Get in Touch" section (above contact details)',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'formTitle',
      title: 'Contact Form Title',
      type: 'string',
      description: 'Heading for the contact form section (currently "Send a Message")',
      validation: (Rule) => Rule.required(),
    }),
    seoFields,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Contact Page',
        subtitle: title || 'Not configured yet',
      };
    },
  },
});
