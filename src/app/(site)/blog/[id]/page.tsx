// app/blog/[slug]/page.tsx

import { getBlogs } from '@/app/actions/getBlogs';
import { BlogPost } from '@/types/Blog';
import type { Metadata } from 'next';
import BlogPostPage from '@/components/Part/Blog/BlogPost';

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
      };
    }
  
    return {
      title: blogPost.title,
      description: blogPost.shortDescription || '',
    };
  }


export default function PostPage({ params }: Props) {
    const { id } = params;
  
   return (
    <BlogPostPage id={id} />
   )
}