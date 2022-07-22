import React from 'react'
import { groq } from "next-sanity";
import client, {
  getClient,
  usePreviewSubscription,
} from "@lib/sanity";
import Link from "next/link";
import Image from "next/future/image";
import { urlFor } from "@lib/sanity";

const Photo = ({photo}) => {
  return (
    <div className='relative h-screen'>
      <div className="w-screen relative bg-red-500">
        <Image 
          className="w-full h-auto" 
          placeholder='blur' 
          blurDataURL={photo.mainImage.metadata.lqip} 
          src={urlFor(photo.mainImage).url()}/>
      </div>
    </div>
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


export const getStaticProps = async ({params}) => {
  const query = groq`
    *[_type == "photo" && slug.current == $slug][0]{
      ...,
      "mainImage": mainImage.asset -> {
        ...,
        metadata {
          exif,
          blurhash,
          palette,
          lqip
        }
      },
      categories[] -> {title},
      lens[] -> {title, mainImage}
    }
  `

  const photo = await getClient().fetch(query, {
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