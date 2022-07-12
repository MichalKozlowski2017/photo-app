import React from 'react'
import { groq } from "next-sanity";
import client, {
  getClient,
  usePreviewSubscription,
} from "@lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@lib/sanity";

const Photo = ({photo}) => {
  console.log(photo)
  return (
    <div>Photo</div>
  )
}

export default Photo

export const getStaticPaths = async ({ params, preview = false }) => {
  const query = groq`
    *[_type == "photo"]{
      _id,
      slug {
        current
      }
    }
  `

  const photos = await getClient(preview).fetch(query);
  const paths = photos.map((photo) => ({
    params: {
      slug: photo.slug.current
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async ({params, preview = false}) => {
  const query = `
    *[_type == "photo" && slug.current == $slug][0]{
      ...,
      categories[] -> {title},
      lens[] -> {title, mainImage}
    }
  `

  const photo = await getClient(preview).fetch(query, {
    slug: params.slug
  })

  if(!photo) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      photo
    },
    revalidate: 60
  }
}