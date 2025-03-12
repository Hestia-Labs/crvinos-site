import { getBlogs } from '@/app/actions/getBlogs';
import { getWines } from '@/app/actions/getWines';
import { BlogPost } from '@/types/Blog';
import { Wine } from '@/types/Wine';
import type { Metadata } from 'next';
import BlogPostPage from '@/components/Part/Blog/BlogPost';
import NoBlogPost from '@/components/Part/Blog/NoBlogPost';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const blogPosts = (await getBlogs({ slug: id, shortVersion: false })) as BlogPost[];
  const blogPost = blogPosts[0];

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for could not be found.',
      keywords: 'blog, post, not found, error',
    };
  }

  const keywords = blogPost.tags ? blogPost.tags.join(', ') : '';
  return {
    title: `${blogPost.title} | CR Vinos MX`,
    description: blogPost.shortDescription || 'Lee más sobre este tema en nuestro blog.',
    keywords: `blog, ${blogPost.title}, ${keywords}`,
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = params;

  const blogPosts = (await getBlogs({ slug: id, shortVersion: false })) as BlogPost[];
  const blogPost = blogPosts[0];
  

  if (!blogPost) {
    return (
      <NoBlogPost/>
    );
  }

  // Fetch recommended wine
  const wines = (await getWines({ count: 10, shortVersion: false })) as Wine[];
  const recommendedWine = wines[Math.floor(Math.random() * wines.length)];

  return (
    <BlogPostPage blogPost={blogPost} recommendedWine={recommendedWine} />
  );
}
