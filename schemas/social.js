import { defineField, defineType } from 'sanity'

const social = defineType({
  name: 'social',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({ name: 'facebook', type: 'url', title: 'Facebook' }),
    defineField({ name: 'twitter', type: 'url', title: 'Twitter' }),
    defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
  ],
});

export default social;
