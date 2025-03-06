import { defineField, defineType } from 'sanity';

export const notificationPop =  defineType({
  name: 'notificationPop',
  title: 'Cartas de Notificaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Banner Image',
      type: 'image',
      description: 'The image to be displayed in the pop-up notification',
      options: {
        hotspot: true,
      },
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
      title: 'Link',
      type: 'url',
      description: 'Optional link for more information or action',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show or hide the pop-up notification',
      initialValue: false,
    }),
  ],
});
