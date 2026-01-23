import { defineType, defineField } from 'sanity';
import { seoFields } from './seoFields';

const normalizeFieldKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

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
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      description: 'Fields shown in the registration form. Checkboxes should be used for acknowledgements and should be required.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldKey',
              title: 'Field Name',
              type: 'string',
              description:
                'Used as the form input name. Must be unique from other form field names. Examples: "Date of Birth", "Emergency contact name", "Upcoming court date".',
              validation: (Rule) =>
                Rule.required().custom((value, context) => {
                  const formattedValue = normalizeFieldKey(String(value ?? ''));
                  if (!formattedValue) {
                    return 'Field name must contain letters or numbers.';
                  }
                  const reservedKeys = new Set(["form-name", "bot-field", "g-recaptcha-response"]);
                  if (reservedKeys.has(formattedValue)) {
                    return 'Field name is reserved for form processing.';
                  }
                  const { formFields } = (context.document ?? {}) as {
                    formFields?: Array<{ _key?: string; fieldKey?: string }>;
                  };
                  if (!formFields) return true;
                  const normalized = formFields
                    .filter((field) => field?._key !== context.parent?._key)
                    .map((field) => normalizeFieldKey(field.fieldKey ?? ''))
                    .filter((item) => item.length > 0);
                  return normalized.includes(formattedValue)
                    ? 'Field name must be unique.'
                    : true;
                }),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Shown above the input on the registration form.',
              validation: (Rule) => Rule.required().max(120),
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              description:
                'Checkbox = acknowledgement/consent. Radio = yes/no or short single-choice where all options should be visible. Select = yes/no or multiple-choice when you want a compact dropdown.',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Date', value: 'date' },
                  { title: 'Select', value: 'select' },
                  { title: 'Radio', value: 'radio' },
                  { title: 'Checkbox', value: 'checkbox' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'options',
              title: 'Options',
              type: 'array',
              description: 'Only used for select or radio fields. Add at least one option.',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !parent?.type || !['select', 'radio'].includes(parent.type),
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (!['select', 'radio'].includes(context.parent?.type ?? '')) {
                    return true;
                  }
                  const options = (value ?? [])
                    .map((option) => String(option ?? '').trim())
                    .filter((option) => option.length > 0);
                  if (options.length === 0) {
                    return 'Add at least one option.';
                  }
                  const uniqueOptions = new Set(options.map((option) => option.toLowerCase()));
                  return uniqueOptions.size !== options.length
                    ? 'Options must be unique.'
                    : true;
                }),
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
              description: 'If checked, the visitor must provide an answer before submitting the form.',
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              hidden: ({ parent }) =>
                !parent?.type || !['text', 'textarea', 'email', 'tel', 'date'].includes(parent.type),
            },
            {
              name: 'helpText',
              title: 'Help Text',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              fieldKey: 'fieldKey',
              type: 'type',
              required: 'required',
            },
            prepare({ fieldKey, type, required }) {
              return {
                title: fieldKey || 'Untitled field',
                subtitle: `${type || 'type'}${required ? ' (required)' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'thankYou',
      title: 'Thank You Message',
      type: 'object',
      description: 'Shown beneath the submit button after successful registration.',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required().max(120),
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().max(400),
        }),
      ],
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
