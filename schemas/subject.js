import { defineField, defineType } from 'sanity'
import { MdWeekend as icon } from 'react-icons/md';

const subject = defineType({
  name: 'subject',
  title: 'Subject',
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Subject',
      type: 'string',
      description: 'This weeks subject',
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
      name: 'week',
      title: 'Week',
      type: 'number',
      decription: 'This weeks number',
      validation: Rule => Rule.required().min(1),
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
      title: 'Week newest',
      name: 'week',
      by: [{ field: 'week', direction: 'desc' }],
    },
    {
      title: 'Week oldest',
      name: 'week',
      by: [{ field: 'week', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      week: 'week',
    },
    prepare({ title, week }) {
      return {
        title: `${week}. ${title}`,
      };
    },
  },
});

export default subject;
