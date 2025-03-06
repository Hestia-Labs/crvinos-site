import { defineType, defineField } from 'sanity';

const instagramSchema = defineType({
  name: 'instagramPost',
  title: 'Publicación de Instagram',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().error('Se requiere texto alternativo para accesibilidad.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('Se requiere una imagen.'),
    }),
    defineField({
      name: 'postUrl',
      title: 'URL de la Publicación',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }).error('Se requiere una URL válida.'),
    }),
    defineField({
      name: 'caption',
      title: 'Subtítulo',
      type: 'string',
      validation: (Rule) => Rule.max(2200).warning('Los subtítulos deben ser concisos.'),
    }),
  ],
});

export {instagramSchema};
