import { useEffect, useState } from "react";
import Head from "next/head";
import { groq } from "next-sanity";
import client, {
  getClient,
  usePreviewSubscription,
} from "@lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@lib/sanity";
import { getPhotosByCategory } from "./api/querys";

export default function Home({photos, categories}) {
  const [items, setItems] = useState(photos)
  
  const handleCategories = (category, e) => {
    document.querySelectorAll('.catBtn').forEach(el => {
      el.classList.remove('bg-red-500')
    })
    e.target.classList.add('bg-red-500')
    getPhotosByCategory(category).then((val)=>{
      setItems(val)
    })
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="flex">
        {categories.map((cat) => (
          <div className={`catBtn cursor-pointer bg-gray-500 px-4 py-2 m-2 text-white rounded hover:bg-red-200 ${cat.slug.current === 'all' ? 'bg-red-500' : ''}`} 
          onClick={(e) => {handleCategories(cat.slug.current, e)}} 
          key={cat._id}>
            {cat.title}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items.map((photo) => (
          <Link href={`/photo/${photo.slug.current}`} key={photo._id}>
            <div className="h-80 sm:h-60 md:h-64 lg:h-72 relative cursor-pointer">
                <Image className="h-full w-full" layout='fill' objectFit='cover' src={urlFor(photo.mainImage).url()}/>
            </div>
          </Link>
        ))}
        
      </div>

    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const query = groq`
    *[_type == "photo"] | order(_createdAt desc) {
      ...,
      categories[] -> {title},
      lens[] -> {title}
    }
  `;
  
  const categoriesQuery = groq`
  *[_type == "category"] | order(_createdAt desc) {
    _id,
    title,
    slug {current}
  }
`;

  const photos = await getClient(preview).fetch(query);
  const categories = await getClient(preview).fetch(categoriesQuery);

  return {
    props: {
      photos,
      categories,
      preview,
    },
    revalidate: 10,
  };
}