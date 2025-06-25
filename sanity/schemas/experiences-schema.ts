// schemas/experience.ts
import { defineType, defineField } from 'sanity';
import uniqid from 'uniqid';

// Simplified Section Types - Only what we need for the new layout
const experienceSectionTypes = {
  DETAIL_SECTION: 'detailSection',
  FEATURE_GRID: 'featureGrid',
  PRICING_SECTION: 'pricingSection',
  SCHEDULE_SECTION: 'scheduleSection',
};

// Reusable section schemas - Simplified for better maintenance
const detailSectionSchema = defineField({
  name: experienceSectionTypes.DETAIL_SECTION,
  title: 'Sección de Detalles',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio Base',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array', 
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Puntos Destacados',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

const featureGridSchema = defineField({
  name: experienceSectionTypes.FEATURE_GRID,
  title: 'Lo que Incluye',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de Sección',
      type: 'string',
      initialValue: 'Lo que incluye',
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              options: {
                list: [
                  { title: 'Viñedo', value: 'Grapevine' },
                  { title: 'Barril', value: 'InfoBarrel' },
                  { title: 'Copa', value: 'InfoCup' },
                  { title: 'Uva', value: 'Single_Grape' },
                  { title: 'Medalla', value: 'Medal' },
                  { title: 'Plato de Vino', value: 'Wine_Plate' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
});

const pricingSectionSchema = defineField({
  name: experienceSectionTypes.PRICING_SECTION,
  title: 'Sección de Precios',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Precios',
    }),
    defineField({
      name: 'basePrice',
      title: 'Precio Base',
      description: 'Precio principal para adultos',
      type: 'number',
    }),
    defineField({
      name: 'additionalOptions',
      title: 'Opciones Adicionales',
      description: 'Incluye precio para niños u otras opciones',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'option',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre de la Opción',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Precio',
              type: 'number',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
});

const scheduleSectionSchema = defineField({
  name: experienceSectionTypes.SCHEDULE_SECTION,
  title: 'Horarios Disponibles',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Horarios Disponibles',
    }),
    defineField({
      name: 'scheduleType',
      title: 'Tipo de Horario',
      description: 'Seleccione cómo quiere configurar los horarios',
      type: 'string',
      options: {
        list: [
          { title: 'Días específicos', value: 'specificDays' },
          { title: 'Rango de días', value: 'dayRange' },
        ],
      },
      initialValue: 'dayRange',
    }),
    defineField({
      name: 'dayRange',
      title: 'Rango de Días',
      description: 'Ej: Miércoles a Domingo',
      type: 'object',
      hidden: ({ parent }) => parent?.scheduleType !== 'dayRange',
      fields: [
        defineField({
          name: 'startDay',
          title: 'Día Inicial',
          type: 'string',
          options: {
            list: [
              { title: 'Lunes', value: 'Lunes' },
              { title: 'Martes', value: 'Martes' },
              { title: 'Miércoles', value: 'Miércoles' },
              { title: 'Jueves', value: 'Jueves' },
              { title: 'Viernes', value: 'Viernes' },
              { title: 'Sábado', value: 'Sábado' },
              { title: 'Domingo', value: 'Domingo' },
            ],
          },
        }),
        defineField({
          name: 'endDay',
          title: 'Día Final',
          type: 'string',
          options: {
            list: [
              { title: 'Lunes', value: 'Lunes' },
              { title: 'Martes', value: 'Martes' },
              { title: 'Miércoles', value: 'Miércoles' },
              { title: 'Jueves', value: 'Jueves' },
              { title: 'Viernes', value: 'Viernes' },
              { title: 'Sábado', value: 'Sábado' },
              { title: 'Domingo', value: 'Domingo' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'specificDays',
      title: 'Días Específicos',
      description: 'Seleccione los días disponibles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Lunes', value: 'Lunes' },
          { title: 'Martes', value: 'Martes' },
          { title: 'Miércoles', value: 'Miércoles' },
          { title: 'Jueves', value: 'Jueves' },
          { title: 'Viernes', value: 'Viernes' },
          { title: 'Sábado', value: 'Sábado' },
          { title: 'Domingo', value: 'Domingo' },
        ],
      },
      hidden: ({ parent }) => parent?.scheduleType !== 'specificDays',
    }),
    defineField({
      name: 'timeSlots',
      title: 'Horarios',
      description: 'Horarios disponibles para la experiencia',
      type: 'array',
      of: [
        defineField({
          type: 'string',
          name: 'timeSlot',
          description: 'Formato: HH:MM (ej: 12:30)',
        }),
      ],
    }),
    defineField({
      name: 'timeSuffix',
      title: 'Sufijo de Tiempo',
      description: 'Ej: hrs, pm, etc.',
      type: 'string',
      initialValue: 'hrs',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Aviso Legal',
      type: 'text',
    }),
  ],
});

export const experienceCategorySchema = defineType({
  name: 'experienceCategory',
  title: 'Categoría de Experiencia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
  ],
});

export const experienceSchema = defineType({
  name: 'experience',
  title: 'Experiencia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).warning('Los títulos deben ser descriptivos y no demasiado cortos'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'experienceCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Precio Base (opcional)',
      type: 'number',
      description: 'Precio por persona en pesos',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'kidsPrice',
      title: 'Precio para Niños (opcional)',
      type: 'number',
      description: 'Precio por persona en pesos',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      description: 'Duración de la experiencia (ej: "2 horas")',
    }),
    defineField({
      name: 'commingSoon',
      title: 'Próximamente',
      type: 'boolean',
      description: 'Indica si la experiencia está en modo próximamente',
      initialValue: false,
    }),
    defineField({
      name: 'basicDescription',
      title: 'Descripción Básica',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    // Simplified content sections field
    defineField({
      name: 'contentSections',
      title: 'Secciones de Contenido',
      description: 'Añade secciones modularizadas para construir la experiencia',
      type: 'array',
      of: [
        detailSectionSchema,
        featureGridSchema,
        pricingSectionSchema,
        scheduleSectionSchema,
      ],
    }),
    defineField({
      name: 'formFields',
      title: 'Configuración del Formulario',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hora del Tour', value: 'tourTime' },
          { title: 'Participantes', value: 'participants' },
          { title: 'Tipo de Evento', value: 'eventType' },
        ],
      },
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'order',
      title: 'Orden en la Categoría',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'seoSlug',
      title: 'Slug para SEO',
      type: 'slug',
      options: {
        source: (doc) => `${doc.title}-${uniqid()}`,
        maxLength: 160,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'draftSwitch',
      title: 'Borrador',
      type: 'boolean',
      description: 'Indica si la experiencia está en modo borrador.',
      initialValue: false,
    }),
  ],
});

// Export the section types for use in components
export const EXPERIENCE_SECTION_TYPES = experienceSectionTypes;

