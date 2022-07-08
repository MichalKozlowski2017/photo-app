import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook
} from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

import { config } from "./config";

const builder = imageUrlBuilder(config)

if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source => {
  return builder.image(source)
}
  

export const imageBuilder = source =>
  imageUrlBuilder(config).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(config);


export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false
});

export const getClient = usePreview =>
  usePreview ? previewClient : client;
export default client;