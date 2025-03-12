// schemas/experience.ts
import { defineType, defineField } from 'sanity';
import uniqid from 'uniqid';

const scheduleSchema = {
    name: 'schedule',
    title: 'Horario',
    type: 'object',
    fields: [
      defineField({
        name: 'timeSlots',
        title: 'Franjas Horarias',
        type: 'array',
        of: [
          defineField({
            type: 'object',
            name: 'timeSlot',
            fields: [
        
              defineField({
                name: 'title',
                title: 'Título del Tiempo',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'time',
                title: 'Rango de Tiempo',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: 'disclaimer',
        title: 'Aviso Legal',
        type: 'text',
      }),
    ],
};

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
        title: 'Precio (opcional)',
        type: 'number',
        description: 'Precio por persona en pesos',
        validation: Rule => Rule.min(0),
      }),
    defineField({
        name: 'basicDescription',
        title: 'Descripción Básica',
        type: 'text',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'customDescription',
        title: 'Usar Interfaz Personalizada',
        type: 'boolean',
        initialValue: false,
    }),
    defineField({
    name: 'defaultDescription',
    title: 'Descripción para Interfaz Predeterminada',
    type: 'object',
    hidden: ({ document }) => !!document?.customDescription,
    fields: [
        defineField({
            name: 'mainParagraph',
            title: 'Párrafo Principal',
            type: 'array', 
            of: [{ type: 'block' }],
            
          }),
        defineField({
            name: 'duration',
            title: 'Duración',
            type: 'string',
            description: 'p. ej., "2 horas", "Día completo"'
          }),
        defineField({
        name: 'features',
        title: 'Características Destacadas',
        type: 'array',
        of: [{ type: 'string' }],
        })
    ]
    }),
    defineField({
        name: 'featureGrid',
        title: 'Cuadrícula de Características',
        type: 'object',
        fields: [
          defineField({
            name: 'items',
            title: 'Elementos de la Cuadrícula',
            type: 'array',
            of: [
              defineField({
                type: 'object',
                name: 'gridItem',

                fields: [
                    defineField({
                        name: 'locationId',
                        title: 'ID de Ubicación',
                        type: 'string',
                        validation: (Rule) => Rule.required(),
                      }),
                    defineField({
                        name: 'mainText',
                        title: 'Título',
                        type: 'string',
                    }),
                    defineField({
                        name: 'description',
                        title: 'Descripción',
                        type: 'text',
                    }),
                    defineField({
                        name: 'image',
                        title: 'Imagen',
                        type: 'image',
                        options: { hotspot: true },
                    }),
                ],
              }),
            ],
            
          }),
        ],
        hidden: ({ document }) => !document?.customDescription,
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

// schemas/experienceCategory.ts


// schemas/objects/featureGrid.ts

// schemas/objects/schedule.ts
