'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPostShort } from '@/types/Blog';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogProps {
  serverPosts: BlogPostShort[]; // Data fetched server-side and passed in
}

const SkeletonLoader: React.FC = () => (
  <div className="flex items-center justify-center flex-col h-100 cursor-pointer animate-pulse">
    <div className="bg-gray-300 w-full h-full"></div>
  </div>
);

const Blog: React.FC<BlogProps> = ({ serverPosts }) => {
  const router = useRouter();

  // Local state for slicing the number of visible posts
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [mobileView, setMobileView] = useState<boolean>(false);

  // Determine how many posts to show based on screen width
  useEffect(() => {
    const updateVisiblePosts = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMobileView(true);
        setVisiblePosts(1);
      } else if (width < 768) {
        setMobileView(true);
        setVisiblePosts(2);
      } else {
        setMobileView(false);
        setVisiblePosts(3);
      }
    };

    updateVisiblePosts();
    window.addEventListener('resize', updateVisiblePosts);
    return () => window.removeEventListener('resize', updateVisiblePosts);
  }, []);

  // If serverPosts is empty or undefined, we can show skeletons
  const loading = !serverPosts || serverPosts.length === 0;

  return (
    <div id="blog-section" className="flex flex-col w-full items-center justify-center border-t-2 border-crred py-12 space-y-9">
      <div className="flex flex-col md:flex-row h-full w-full justify-center items-start">
        {/* Left Side: Intro Text / "Ver Todo" Link */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/3 space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-crred font-light tracking-wide mb-2">
            Nuestro Blog
          </h2>
          <div className="w-full mb-8">
            <p className="text-crred font-light italic text-base md:text-lg lg:text-xl">
              Cada entrada de nuestro blog es un brindis a la pasión y el arte del vino. 
              Sumérgete en historias que celebran la tradición vinícola y descubre los secretos detrás de cada copa.
            </p>
          </div>
          <div className="flex w-full justify-start items-center mt-12 py-2 px-2">
            <Link href="/blog">
              <div className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:translate-x-1 cursor-pointer border-b border-crred">
                <p className=" text-crred text-lg md:text-2xl font-light italic transition-colors duration-300 ease-in-out hover:text-crred-75">
                  Ver Todo
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: Blog Posts Grid */}
        <div className="p-4 w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {loading ? (
            // Show skeleton loaders if no blog posts
            Array.from({ length: visiblePosts }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            serverPosts.slice(0, visiblePosts).map((post) => (
              <motion.div
                key={post._id}
                className="flex flex-col h-full cursor-pointer justify-center items-center group"
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                {/* Banner Image */}
                {post.bannerImage && (
                  <div className="w-full h-86 overflow-hidden">
                    <Image
                      src={post.bannerImage.asset.url}
                      alt={post.bannerImage.alt || ""}
                      width={0}
                      height={0}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px"
                      loading='lazy'
                      className="object-cover w-full h-full filter grayscale rounded-lg transition-opacity duration-300 group-hover:opacity-75"
                    />
                  </div>
                )}

                {/* Post Title & Short Description */}
                <div className="flex flex-col flex-grow p-4 mt-4 border-t border-crred">
                  <h3 className="md:text-xl text-crred ">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-base mt-2">
                    {post.shortDescription.substring(0, mobileView ? 150 : 75)}
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
