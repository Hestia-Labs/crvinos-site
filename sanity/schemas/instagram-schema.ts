import { defineType, defineField } from 'sanity';

const instagramSchema = defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alternative text is required for accessibility.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('An image is required.'),
    }),
    defineField({
      name: 'postUrl',
      title: 'Post URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] }).error('A valid URL is required.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) => Rule.max(2200).warning('Captions should be concise.'),
    }),
  ],
});

export {instagramSchema};

