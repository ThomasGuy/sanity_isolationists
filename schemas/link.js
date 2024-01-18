import { GoLink as icon } from 'react-icons/go';
import { defineField, defineType } from 'sanity'


const link = defineType({
  name: 'link',
  title: 'Link',
  icon,
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'link name',
      type: 'string',
      description: 'Links visible name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'url',
      type: 'url',
      decription: 'Link URL',
      validation: Rule => Rule.required().min(1),
    }),
  ],
});

export default link;
