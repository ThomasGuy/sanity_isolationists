import { BiPalette as icon } from 'react-icons/bi';
import { defineType, defineField, defineArrayMember } from 'sanity'

const artist = defineType({
  name: 'artist',
  title: 'Artist',
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artists name',
      type: 'string',
      description: 'Artist name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'education',
      title: 'Honors',
      type: 'string',
      decription: 'qualifications/degrees',
    }),
    defineField({
      name: 'email',
      title: 'email',
      type: 'string',
    }),
    defineField({
      name: 'mug',
      title: 'Mug Shot',
      type: 'image',
      decription: 'Artists Photo',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      decription: 'College degrees',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Biography',
      name: 'biography',
      description: 'Enter Biography paragraph by paragraph',
      validation: Rule => Rule.required(),
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'links',
      title: 'Website Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      title: 'Social Media',
      name: 'social',
      type: 'social',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Artist Name',
      name: 'artist',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});

export default artist
