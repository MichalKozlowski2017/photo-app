export default {
  name: "lens",
  title: "Lenses",
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
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "codeName",
      title: "Code name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};