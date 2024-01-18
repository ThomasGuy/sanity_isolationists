import { BiRuler as icon } from 'react-icons/bi';
import { defineField, defineType } from 'sanity'

const dimensions = defineType({
  name: 'dimensions',
  title: 'Dimensions',
  icon,
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: 'Width cm',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
  ],
});

export default dimensions;
