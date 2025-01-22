'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/Blog';
import { Wine } from '@/types/Wine';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import BasicButton from '@/components/Buttons/BasicButton';
import { clientConfig } from '@/utils/sanity/config';
import imageUrlBuilder from '@sanity/image-url';


type Props = {
  blogPost: BlogPost;
  recommendedWine: Wine | null;
};



export default function BlogPostPage({ blogPost, recommendedWine }: Props) {
  const builder = imageUrlBuilder(clientConfig)
  const urlFor = (source: string) => builder.image(source)

  const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <p className="text-gray-700 text-xl mb-6 leading-relaxed">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl text-crred tracking-wide mt-12 mb-8">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl text-crred mt-10 mb-6">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl text-crred mt-8 mb-4">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="text-gray-600 text-xl italic border-l-4 border-crred pl-4 my-8">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside text-gray-700 text-lg ml-4 mb-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside text-gray-700 text-lg ml-4 mb-6">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-2">{children}</li>,
      number: ({ children }) => <li className="mb-2">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => {
        const rel = value.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-crred underline">
            {children}
          </a>
        );
      },
    },
    types: {
      image: async ({ value }) => {const image = urlFor(value.asset._ref).width(800).height(600).url(); return(
        <div className="my-8">
          <Image
            src={ image || ''}
            alt={value.alt || 'Blog Image'}
            width={800}
            height={600}
            className="object-cover object-center rounded-lg"
          />
        </div>
      )},
    },
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Navbar redLogo red relative />

      {blogPost?.bannerImage && (
        <div className="relative w-11/12 h-64 md:h-96">
          <Image
            src={blogPost.bannerImage.asset.url}
            alt={blogPost.bannerImage.alt || blogPost.title}
            fill
            className="object-cover object-center rounded-lg"
          />
        </div>
      )}

      <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col items-center mt-12">
        <div className="max-w-3xl w-full">
          <div className="flex w-full justify-start items-center mb-8">
            <Link href="/blog">
              <div className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:-translate-x-2 cursor-pointer">
                <Icon
                  name="Arrow"
                  className="h-5 w-5 text-crred transition-transform duration-300 ease-in-out transform hover:translate-x-2"
                  style={{ transform: 'rotate(180deg)' }}
                />
                <p className="font-cormorant text-crred text-lg transition-colors duration-300 ease-in-out hover:text-crred-light">
                  Regresar
                </p>
              </div>
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl text-crred tracking-wide mb-6">{blogPost.title}</h1>

          <p className="text-gray-500 text-base mb-12">
            {new Date(blogPost?.publishedDate || "").toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <PortableText value={blogPost.content || []} components={myPortableTextComponents} />
          </div>

          {recommendedWine && (
            <div className="mt-16 px-4 bg-back md:flex md:justify-center py-5">
              <div className="max-w-4xl mx-auto flex flex-row text-center md:text-start">
                <h2 className="text-5xl md:text-5xl text-crred italic md:mb-8">Descubre</h2>
              </div>
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-center space-y-8 md:space-y-0 md:space-x-12 md:py-8">
                <div className="w-full md:w-1/3 flex md:justify-end justify-center">
                  <Image
                    src={recommendedWine.photo.asset.url}
                    alt={recommendedWine.photo.alt || recommendedWine.name}
                    width={192}
                    height={350}
                    className="object-contain w-auto h-4/6"
                  />
                </div>

                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl text-crred mb-4">
                    {recommendedWine.collection} {recommendedWine.name}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {recommendedWine.description ||
                      'Sumérgete en los sabores y aromas únicos de este vino excepcional, reflejo de nuestra tradición y pasión.'}
                  </p>
                  <BasicButton
                    link={`/catalog/wine/${recommendedWine.slug}`}
                    variant="bg-crred"
                    className="border-crred border"
                  >
                    Descubrir Vino
                  </BasicButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-auto">
        <div className="absolute -bottom-80 right-0 -z-10">
          <Icon name="VineLeaf" className="h-80 w-full opacity-40" />
        </div>
      </div>
    </div>
  );
}
