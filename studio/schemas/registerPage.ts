import { defineType, defineField } from 'sanity';
import { seoFields } from './seoFields';

export default defineType({
  name: 'registerPage',
  title: 'Register Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading at the top of the page (currently "Start Your Journey")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Text shown below the title, above the registration form',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'nextSteps',
      title: 'What Happens Next Section',
      type: 'object',
      description: 'Information shown below the form about the registration process',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Heading for this section (currently "What Happens Next?")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          description: 'List of steps in the registration process. You can add, remove, or reorder steps.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'string',
                  description: 'What happens in this step',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  description: 'description',
                },
                prepare({ description }) {
                  return {
                    title: description || 'Untitled step',
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    seoFields,
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Register Page',
        subtitle: title || 'Not configured yet',
      };
    },
  },
});
