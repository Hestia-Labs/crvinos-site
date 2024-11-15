import { defineType, defineField } from 'sanity';
import uniqid from 'uniqid';

const eventSchema = defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).warning('Los títulos deben ser descriptivos y no demasiado cortos.'),
    }),
    defineField({
      name: 'dates',
      title: 'Fechas',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          title: 'Fecha de Inicio',
          type: 'datetime',
          validation: (Rule) => Rule.required().min('2023-01-01T00:00:00.000Z').error('Debe establecer una fecha de inicio en el futuro.'),
        }),
        defineField({
          name: 'end',
          title: 'Fecha de Finalización',
          type: 'datetime',
          validation: (Rule) => Rule.required().custom((end, context) => {
            const start = (context.document as { dates?: { start?: string } })?.dates?.start;
            if (!start) {
              return 'La fecha de inicio es requerida.';
            }
            return end && end > start
              ? true
              : 'La fecha de finalización debe ser posterior a la fecha de inicio.';
          }),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organizer',
      title: 'Organizador',
      type: 'string',
      validation: (Rule) => Rule.required().error('La información del organizador es obligatoria.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vendimia', value: 'vendimia' },
          { title: 'Cata', value: 'cata' },
          { title: 'Clase', value: 'clase' },
          { title: 'Curso', value: 'curso' },
          { title: 'Cena', value: 'cena' },
        ],
      },
      validation: (Rule) => Rule.unique().required().min(1).error('Debe especificar al menos una categoría y las categorías deben ser únicas.'),
    }),
    defineField({
      name: 'poster',
      title: 'Póster',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().error('Debe ingresar texto alternativo para la imagen para mejorar la accesibilidad.'),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attendanceCap',
      title: 'Límite de Asistencia',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).error('El límite de asistencia debe ser al menos 1.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().min(10).warning('La descripción es demasiado corta.'),
    }),
    defineField({
      name: 'article',
      title: 'Artículo',
      type: 'text',
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [
        defineField({
          name: 'imageUrl',
          title: 'Imagen',
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo para lectores de pantalla',
            }),
            defineField({
              name: 'description',
              type: 'string',
              title: 'Una descripción que se mostrará debajo de la foto',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'link',
      title: 'Enlace',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }).warning('URL inválida, asegúrese de usar http o https.'),
    }),
    defineField({
      name: 'textLocation',
      title: 'Ubicación del Texto',
      type: 'string',
      validation: (Rule) => Rule.required().error('La ubicación del texto es obligatoria.'),
    }),
    defineField({
      name: 'locationLink',
      title: 'Enlace de Ubicación',
      type: 'url',
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }).warning('URL inválida, asegúrese de usar http o https.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
            const dates = (doc as unknown as { dates: { start: string } }).dates;
            return `${doc.title}-${new Date(dates.start).toISOString().split('T')[0]}-${uniqid()}`;
          },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Un slug es necesario para fines de SEO.'),
    }),
  ],
});

export default eventSchema;
