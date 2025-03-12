import { defineField, defineType } from 'sanity';

export const Images = defineType({
  name: 'imageWithLocation',
  title: 'Image with Location',
  type: 'document',
  fields: [
    defineField({
        name: 'locationId',
        title: 'ID de Ubicación',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true, 
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
