'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { getBlogs } from '@/app/actions/getBlogs';
import { getWines } from '@/app/actions/getWines';
import { BlogPost } from '@/types/Blog';
import { Wine } from '@/types/Wine';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import BasicButton from '@/components/Buttons/BasicButton';




type Props = {
    id: string;
  };

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
  };
  
  export default function BlogPostPage({ id }: Props) {
    
    
      const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
      const [recommendedWine, setRecommendedWine] = useState<Wine | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [notFoundState, setNotFoundState] = useState<boolean>(false);
    
      useEffect(() => {
        const fetchData = async () => {
          try {

            const blogPosts = (await getBlogs({ slug: id, shortVersion: false })) as BlogPost[];
            const post = blogPosts[0];
    
            if (!post) {
              setNotFoundState(true);
              setLoading(false);
              return;
            }
    
            setBlogPost(post);
    

            const wines = (await getWines({
              count: 10,
              shortVersion: false,
            })) as Wine[];
    

            const wine = wines[Math.floor(Math.random() * wines.length)];
            setRecommendedWine(wine);
          } catch (error) {
            console.error('Error fetching data:', error);
            setNotFoundState(true);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [id]);
    
      if (loading) {

        return (
          <div className="flex flex-col min-h-screen">

            <Navbar redLogo red relative />
      

            <div className="relative w-full h-64 md:h-96 bg-gray-200 animate-pulse">

            </div>
      

            <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col items-center mt-12">
              <div className="max-w-3xl w-full">

                <div className="flex w-full justify-start items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
                    <div className="w-24 h-5 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
      

                <div className="h-12 w-3/4 bg-gray-200 animate-pulse mb-6"></div>
      

                <div className="h-4 w-1/4 bg-gray-200 animate-pulse mb-12"></div>
      

                <div className="space-y-4">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="h-4 w-full bg-gray-200 animate-pulse"></div>
                  ))}
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
                </div>
      

                <div className="mt-16 py-12 bg-gray-50">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="h-8 w-2/3 bg-gray-200 animate-pulse mx-auto mb-8"></div>
                  </div>
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">

                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="w-48 h-72 bg-gray-200 animate-pulse"></div>
                    </div>

                    <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
                      <div className="h-6 w-1/2 bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
                      <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
                      <div className="h-10 w-40 bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </div>
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
    
      if (notFoundState || !blogPost) {

        return (
          <div className="flex flex-col min-h-screen">

            <Navbar redLogo red relative />
    

            <div className="flex flex-col items-center justify-center py-24">
              <h1 className="text-4xl text-crred mb-4">Publicación no encontrada</h1>
              <p className="text-gray-700 mb-8">
                Lo sentimos, no pudimos encontrar la publicación que buscas.
              </p>
              <Link className="text-crred underline" href="/blog">
               Volver al blog
              </Link>
            </div>
          </div>
        );
      }
    
      return (
        <div className="flex flex-col min-h-screen justify-center items-center">

          <Navbar redLogo red relative />
    
          {blogPost.bannerImage && (
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
                {new Date(blogPost.publishedDate).toLocaleDateString()}
              </p>
    

              <div className="prose prose-lg max-w-none">
                <PortableText value={blogPost.content} components={myPortableTextComponents} />
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