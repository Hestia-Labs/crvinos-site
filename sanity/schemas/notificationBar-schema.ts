import { defineField, defineType } from 'sanity';

export const notificationBar =  defineType({
  name: 'notificationBar',
  title: 'Barra de Noticias',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'The message to be displayed in the notification bar',
      validation: Rule => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link for more information',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show or hide the notification bar',
      initialValue: true,
    }),    
  ],
});
