import { groq } from "next-sanity";
import {getClient} from "@lib/sanity";

export const getPhotosByCategory = async (keyword) => {
  const query = groq`
    *[_type == "photo" ${keyword != 'all' ? `&& $keyword in categories[]->slug.current` : ''}] | order(_createdAt desc) {
      ...,
      categories[0] -> {title},
      lens[0] -> {title},
      "mainImage": mainImage.asset -> {
        ...,
        metadata {
          exif,
          blurhash,
          palette,
          lqip
        }
      },
    }
  `;
  const filteredPhotos = await getClient().fetch(query, {keyword: keyword})
  return filteredPhotos
}