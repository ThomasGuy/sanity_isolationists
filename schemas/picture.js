import { defineType, defineField, defineArrayMember } from 'sanity';
import { AiOutlinePicture as icon } from 'react-icons/ai';

async function getSlug(doc, context) {
  const {getClient} = context;
  const client = getClient({ apiVersion: '2024-01-01' })
  const subref = (context.parent.subject._ref)
  const artref = (context.parent.artist._ref)
  const subject = await client.fetch(`*[_id == "${subref}"][0]`)
  const artist = await client.fetch(`*[_id == "${artref}"][0]`)
  return `${subject.name}-by-${artist.name}`;
}


export const picture = defineType({
  name: 'picture',
  title: 'Picture',
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [defineArrayMember({ type: 'artist' })],
      validation: Rule => Rule.required().error("One of the artists must be chosen"),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [defineArrayMember({ type: 'subject' })],
      validation: Rule => Rule.required().error("A subject is required"),
    }),
    defineField({
      name: 'title',
      title: 'Picture Title (optional)',
      type: 'string',
      options: {
        maxLength: 80,
      }
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      description: 'Mark this picture as sold',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: async (doc, context) => await getSlug(doc, context),
        maxLength: 150,
      },
      validation: Rule => Rule.required().error('Slug must be unique'),
    }),
    defineField({
      name: 'dimensions',
      title: 'Image dimensions',
      type: 'dimensions',
      description: 'Image dimensions',
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
      title: 'Artist name',
      name: 'artist',
      by: [{ field: 'artist.name', direction: 'asc' }],
    },
    {
      title: 'Subject week desc',
      name: 'subject',
      by: [{ field: 'subject.week', direction: 'desc' }],
    },
    {
      title: 'Subject name desc',
      name: 'subject',
      by: [{ field: 'subject.name', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      artist: 'artist.name',
      subject: 'subject.name',
      week: 'subject.week',
      media: 'image',
    },
    prepare({ artist, subject, week, media }) {
      return {
        title: `${artist} - ${week}. ${subject}`,
        media,
      };
    },
  },
});

export default picture;
