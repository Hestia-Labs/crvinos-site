'use client';

import React, { useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BlogPostShort } from '@/types/Blog';
import Icon from '@/components/Icons';

interface BlogClientProps {
  initialPosts: BlogPostShort[];
  categories: string[];
}

const BlogClient: React.FC<BlogClientProps> = ({ initialPosts, categories }) => {
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const router = useRouter();

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, initialPosts.length));
  };

  return (
    <div className='flex flex-col w-full items-center justify-center space-y-7 px-8 md:px-12 lg:px-16 xl:px-20'>
      <div className='flex flex-col justify-center items-center w-full space-y-6 py-8 sm:py-12 md:py-16 lg:py-20'>
        <h2 className='text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-crred font-light tracking-wide mb-4'>
          Nuestro Blog
        </h2>
      </div>
      <div className='w-full border-t-2 border-crred py-4 sm:py-6 md:py-8 lg:py-10 flex flex-col items-center space-y-5'>
        <div className='w-full flex flex-col justify-start space-y-2'>
          <div className='flex space-x-4 px-4'>
            <button
              className={clsx('text-sm sm:text-base md:text-lg hover:underline', {
                'text-crred': selectedCategory === 'Todos',
                'text-gray-500': selectedCategory !== 'Todos',
              })}
              onClick={() => setSelectedCategory('Todos')}
            >
              Todos
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full justify-center items-center'>
          {initialPosts.slice(0, visiblePosts).map((post, index) => (
            <div
              key={index}
              onClick={() => router.push(`/blog/${post.slug}`)}
              className='cursor-pointer flex flex-col sm:flex-row justify-between items-center w-full sm:w-3/4 md:w-10/12 h-full border-b border-crred mb-6 sm:mb-8 px-6 sm:px-8 md:px-3 py-4'
            >
              <div className='flex flex-col items-start justify-between space-y-3 sm:space-y-4'>
                <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-crred w-3/4'>{post.title}</h3>
                <div className='w-full h-32 overflow-hidden md:hidden'>
                  {post.bannerImage && (
                    <Image
                      src={post.bannerImage.asset.url}
                      alt={post.bannerImage.alt || post.title}
                      width={0}
                      height={0}
                      sizes='100vw'
                      priority
                      className='w-full h-full rounded-lg object-cover filter grayscale'
                    />
                  )}
                </div>
                <div className='max-w-lg'>
                  <p className='text-sm sm:text-base md:text-lg text-gray-600'>{post.shortDescription}</p>
                  <p className='text-xs sm:text-sm md:text-base text-gray-500'>
                    {new Date(post.publishedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='p-4 hidden md:block sm:w-48 md:w-96 h-full sm:h-48 md:h-56'>
                {post.bannerImage && (
                  <Image
                    src={post.bannerImage.asset.url}
                    alt={post.bannerImage.alt || post.title}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-full rounded-lg object-cover filter grayscale'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {visiblePosts < initialPosts.length && (
          <div className='flex w-full justify-center items-center'>
            <BasicButton
              onClick={loadMorePosts}
              variant='transparent'
              sizex='xxxxlarge'
              className='border-crred border border-solid'
            >
              <p className='text-lg'>Cargar Más</p>
            </BasicButton>
          </div>
        )}
      </div>
      <div className='absolute -bottom-80 right-0 -z-10'>
        <Icon name='VineLeaf' className='h-80 w-full opacity-40' />
      </div>
    </div>
  );
};

export default BlogClient;
