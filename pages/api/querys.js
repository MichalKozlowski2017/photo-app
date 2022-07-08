import { groq } from "next-sanity";
import client, {
  getClient,
  usePreviewSubscription,
} from "@lib/sanity";

export const getPhotosByCategory = async (keyword, preview = false) => {
  const query = groq`
    *[_type == "photo" && $keyword in categories[]->slug.current] | order(_createdAt desc) {
      ...,
      categories[0] -> {title},
      lens[0] -> {title}
    }
  `;
  
  const filteredPhotos = await getClient(preview).fetch(query, {keyword: keyword})
  return filteredPhotos
}