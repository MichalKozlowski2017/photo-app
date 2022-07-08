export default {
  name: "photo",
  title: "Photos",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "_id",
      }
    },
    {
      name: "excerpt",
      description:
        "Write a short pararaph of this post (For SEO Purposes)",
      title: "Excerpt",
      rows: 5,
      type: "text",
      validation: Rule =>
        Rule.max(160).error(
          "SEO descriptions are usually better when its below 160"
        )
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'lens',
      title: 'Lens',
      type: 'array',
      of: [{type: 'reference', to: {type: 'lens'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
};