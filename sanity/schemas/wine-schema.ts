import { defineType, defineField } from 'sanity';

const collectionSchema = defineType({
  name: 'collection',
  title: 'Colección',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre es obligatorio.'),
    }),
    defineField({
      name: 'story',
      title: 'Historia',
      type: 'text',
      validation: (Rule) => Rule.required().error('La historia es obligatoria.'),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().error('Debe ingresar texto alternativo para la imagen.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('La foto es obligatoria.'),
    }),
    defineField({
      name: 'wines',
      title: 'Vinos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'wine' }] }],
      validation: (Rule) => Rule.required().min(1).error('Debe haber al menos un vino en la colección.'),
    }),
  ],
});

const wineSchema = defineType({
  name: 'wine',
  title: 'Vino',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre es obligatorio.'),
    }),
    defineField({
      name: 'collection',
      title: 'Colección',
      type: 'reference',
      to: [{ type: 'collection' }],
      options: {
        disableNew: true, // To ensure new collections are not created directly from the wine schema
      },
    }),
    defineField({
      name: 'type',
      title: 'Tipología',
      type: 'string',
      validation: (Rule) => Rule.required().error('La tipología es obligatoria.'),
    }),
    defineField({
      name: 'origin',
      title: 'Origen',
      type: 'string',
      validation: (Rule) => Rule.required().error('El origen es obligatorio.'),
    }),
    defineField({
      name: 'grapeVariety',
      title: 'Variedad de Uva',
      type: 'string',
      validation: (Rule) => Rule.required().error('La variedad de uva es obligatoria.'),
    }),
    defineField({
      name: 'vinification',
      title: 'Vinificación',
      type: 'text',
      validation: (Rule) => Rule.required().error('La vinificación es obligatoria.'),
    }),
    defineField({
      name: 'appearance',
      title: 'Vista',
      type: 'text',
      validation: (Rule) => Rule.required().error('La descripción de la vista es obligatoria.'),
    }),
    defineField({
      name: 'nose',
      title: 'Nariz',
      type: 'text',
      validation: (Rule) => Rule.required().error('La descripción de la nariz es obligatoria.'),
    }),
    defineField({
      name: 'taste',
      title: 'Gusto',
      type: 'text',
      validation: (Rule) => Rule.required().error('La descripción del gusto es obligatoria.'),
    }),
    defineField({
      name: 'pairing',
      title: 'Maridaje',
      type: 'text',
      validation: (Rule) => Rule.required().error('La descripción del maridaje es obligatoria.'),
    }),
    defineField({
      name: 'temperature',
      title: 'Temperatura de Servicio',
      type: 'string',
      validation: (Rule) => Rule.required().error('La temperatura de servicio es obligatoria.'),
    }),
    defineField({
      name: 'alcoholPercentage',
      title: 'Porcentaje Alcohólico',
      type: 'string',
      validation: (Rule) => Rule.required().error('El porcentaje alcohólico es obligatorio.'),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().error('Debe ingresar texto alternativo para la imagen.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('La foto es obligatoria.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required().error('El slug es obligatorio.'),
    }),
    defineField({
      name: 'awards',
      title: 'Premios',
      type: 'array',
      of: [
        defineField({
          name: 'award',
          title: 'Premio',
          type: 'object',
          fields: [
            defineField({
              name: 'premioImage',
              title: 'Imagen del Premio',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Texto Alternativo',
                  type: 'string',
                  validation: (Rule) => Rule.required().error('Debe ingresar texto alternativo para la imagen del premio.'),
                }),
              ],
            }),
            defineField({
              name: 'premioLink',
              title: 'Enlace del Premio',
              type: 'url',
              validation: (Rule) => Rule.required().error('El enlace del premio es obligatorio.'),
            }),
          ],
        }),
      ],
    }),
  ],
});

export { collectionSchema, wineSchema };