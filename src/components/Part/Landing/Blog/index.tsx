// Blog.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import { getBlogs } from '@/app/actions/getBlogs';
import { BlogPostShort } from '@/types/Blog';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/Icons';

const SkeletonLoader: React.FC = () => (
    <div className="flex items-center justify-center flex-col h-100 cursor-pointer animate-pulse">
        <div className="bg-gray-300 w-full h-full"></div>
    </div>
);

const Blog: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<BlogPostShort[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [mobileView, setMobileView] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getBlogs({shortVersion: true});
        setPosts(res);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {

    const updateVisiblePosts = () => {
      if (window.innerWidth < 640) {
        setMobileView(true);
        setVisiblePosts(1);
      } else if (window.innerWidth < 768) {
        setMobileView(true);
        setVisiblePosts(2);
      } else {
        setVisiblePosts(3);
      }
    };

    updateVisiblePosts();
    window.addEventListener('resize', updateVisiblePosts);
    return () => window.removeEventListener('resize', updateVisiblePosts);
  }, []);

  const handleButtonClick = () => {
    router.push('/blog');
  };

  return (
    <div  id="blog-section" className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-9">
      <div className='flex flex-col md:flex-row h-full w-full justify-center items-start'>
        <div className='flex flex-col justify-center items-start w-full md:w-1/3 space-y-2'>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-crred font-light tracking-wide mb-2">Nuestro Blog</h2>
          <div className="w-full mb-8">
            <p className="text-crred font-light italic text-base md:text-lg lg:text-xl">
              Cada entrada de nuestro blog es un brindis a la pasión y el arte del vino. 
              Sumérgete en historias que celebran la tradición vinícola y descubre los secretos detrás de cada copa.
            </p>
          </div>
          <div className="flex w-full justify-start items-center mt-12 py-2">
            <Link href="/blog">
              <div className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:translate-x-1 cursor-pointer border-b border-crred">
                <p className="font-cormorant text-crred text-lg md:text-xl transition-colors duration-300 ease-in-out hover:text-crred-light">
                  Ver Todo
                </p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="p-4 justify-end items-end w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {loading ? (
            Array.from({ length: visiblePosts }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            posts.slice(0, visiblePosts).map((post) => (
              <motion.div 
                className='flex flex-col h-full cursor-pointer justify-center items-center group' 
                key={post._id}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                {post.bannerImage && (
                  <div className='w-full h-86 overflow-hidden'>
                    <Image 
                      src={post.bannerImage.asset.url} 
                      alt={post.bannerImage.alt || ""} 
                      width={320} 
                      height={256} 
                      sizes='100vw' 
                      priority 
                      className='object-cover w-full h-full filter grayscale rounded-lg transition-opacity duration-300 group-hover:opacity-75' 
                    />
                  </div>
                )}
                <div className='flex flex-col flex-grow p-4 mt-4 border-t border-crred'>
                  <h3 className="text-xl text-crred font-bold">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-base mt-2">
                    {post.shortDescription.substring(0, (mobileView ? 150 : 75))}
                    {post.shortDescription.length > (mobileView ? 150 : 75) ? '...' : ''}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
