const imageBlock = {
    name: 'imageBlock',
    title: 'Bloque de Imagen',
    type: 'object',
    fields: [
        {
            name: 'location',
            title: 'Ubicación',
            description:
                'Un identificador único para donde la imagen debe ser colocada en la página.',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'caption',
                    title: 'Subtítulo',
                    type: 'string',
                    options: {
                        isHighlighted: true,
                    },
                },
                {
                    name: 'alt',
                    title: 'Texto Alternativo',
                    type: 'string',
                    description:
                        'Una descripción de la imagen para propósitos de accesibilidad.',
                },
            ],
        },
    ],
}

const textBlock = {
    name: 'textBlock',
    title: 'Bloque de Texto',
    type: 'object',
    fields: [
        {
            name: 'location',
            title: 'Ubicación',
            description:
                'Un identificador único para donde el texto debe ser colocado en la página.',
            type: 'string',
        },
        {
            name: 'text',
            title: 'Texto',
            type: 'text',
            rows: 4,
        },
    ],
}

const blockContent = {
    name: 'blockContent',
    title: 'Contenido de Bloque',
    type: 'object',
    fields: [
        {
            name: 'location',
            title: 'Ubicación',
            type: 'string',
            description:
                'Un identificador único para donde el Texto Portable es colocado.',
        },
        {
            name: 'content',
            title: 'Contenido',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
}

const page = {
    name: 'page',
    title: 'Páginas',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'content',
            title: 'Contenido',
            type: 'array',
            of: [imageBlock, textBlock, blockContent],
        },
    ],
}

export default page
