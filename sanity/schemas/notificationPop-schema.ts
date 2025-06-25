import { defineField, defineType } from 'sanity';

export const notificationPop = defineType({
  name: 'notificationPop',
  title: 'Cartas de Notificaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      description: 'Select the type of content this notification is promoting',
      options: {
        list: [
          { title: 'Custom Link', value: 'custom' },
          { title: 'Event', value: 'event' },
          { title: 'Experience', value: 'experience' },
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'image',
      description: 'The image to be displayed in the pop-up notification (only required for custom links, optional for events/experiences which use their own images)',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.custom((field, context) => {
        // Get the document
        const document = context.document;
        // Only require banner for custom content type
        if (document?.contentType === 'custom' && !field) {
          return 'Banner image is required for custom notifications';
        }
        return true;
      }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the pop-up notification',
      validation: Rule => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle or additional information for the pop-up notification',
      validation: Rule => Rule.max(150),
    }),
    defineField({
      name: 'link',
      title: 'Custom Link',
      type: 'url',
      description: 'Optional link for more information or action (use for custom links)',
      hidden: ({ document }) => document?.contentType !== 'custom',
      validation: Rule => Rule.custom((field, context) => {
        // Require link for custom content type
        if (context.document?.contentType === 'custom' && !field) {
          return 'Link is required for custom notifications';
        }
        return true;
      }),
    }),
    defineField({
      name: 'eventReference',
      title: 'Event Reference',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Select an event to promote in this notification',
      hidden: ({ document }) => document?.contentType !== 'event',
      validation: Rule => Rule.custom((field, context) => {
        // Require event reference for event content type
        if (context.document?.contentType === 'event' && !field) {
          return 'Event reference is required for event notifications';
        }
        return true;
      }),
    }),
    defineField({
      name: 'experienceReference',
      title: 'Experience Reference',
      type: 'reference',
      to: [{ type: 'experience' }],
      description: 'Select an experience to promote in this notification',
      hidden: ({ document }) => document?.contentType !== 'experience',
      validation: Rule => Rule.custom((field, context) => {
        // Require experience reference for experience content type
        if (context.document?.contentType === 'experience' && !field) {
          return 'Experience reference is required for experience notifications';
        }
        return true;
      }),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'Saber más',
      validation: Rule => Rule.max(30),
    }),
    defineField({
      name: 'displayOptions',
      title: 'Display Options',
      type: 'object',
      fields: [
        defineField({
          name: 'frequency',
          title: 'Display Frequency',
          type: 'string',
          description: 'How often should this notification appear to a user',
          options: {
            list: [
              { title: 'Every Visit', value: 'everyVisit' },
              { title: 'Once per Day', value: 'daily' },
              { title: 'Once per Week', value: 'weekly' },
              { title: 'Once Only', value: 'once' },
            ]
          },
          initialValue: 'once',
        }),
        defineField({
          name: 'delay',
          title: 'Display Delay (seconds)',
          type: 'number',
          description: 'Seconds to wait after age verification before showing the popup',
          initialValue: 5,
          validation: Rule => Rule.min(0).max(60),
        }),
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show or hide the pop-up notification',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'banner',
      isActive: 'isActive',
      contentType: 'contentType',
    },
    prepare({ title, subtitle, media, isActive, contentType }) {
      return {
        title: `${title} ${isActive ? '(Active)' : '(Inactive)'}`,
        subtitle: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)}: ${subtitle || 'No subtitle'}`,
        media: media,
      };
    },
  },
});
