import React from 'react'
import { groq } from "next-sanity";
import {getClient} from "@lib/sanity";
import { shutterSpeed } from 'helpers';
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@lib/sanity";
import { IoMdAperture } from 'react-icons/io'
import { MdAvTimer } from 'react-icons/md'
import { CgChevronLeft } from 'react-icons/cg'
const Photo = ({photo}) => {
  console.log(photo.mainImage.metadata)

  return (
    <div className='relative h-screen'>
      <div className="w-screen relative bg-red-500 mt-16">
        <Image 
          layout="responsive"
          width={1500}
          height={1000}
          // placeholder='blur' 
          // blurDataURL={photo.mainImage.metadata.lqip} 
          src={urlFor(photo.mainImage).url()}/>
      </div>
      <div className="photo-info">
        <div className='exif-data'>
          <h2>Details:</h2>
          <div className="exif-data__item">
            <span className='font-bold text-grey-900'><CgChevronLeft className='inline-block'/></span>
            <span className='text-grey-700'> {photo.mainImage.metadata.exif.FocalLength}mm ({photo.mainImage.metadata.exif.FocalLengthIn35mmFormat}mm in FF)</span>
          </div>
          <div className="exif-data__item">
            <span className='font-bold text-grey-900'><MdAvTimer className='inline-block'/></span>
            <span className='text-grey-700'> {shutterSpeed(photo.mainImage.metadata.exif.ExposureTime)}</span>
          </div>
          <div className="exif-data__item">
            <span className='font-bold text-grey-900'><IoMdAperture className='inline-block'/></span>
            <span className='text-grey-700'> F{photo.mainImage.metadata.exif.FNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Photo

export const getStaticPaths = async () => {
  const query = groq`
    *[_type == "photo"]{
      _id,
      slug {
        current
      }
    }
  `

  const photos = await getClient().fetch(query);
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