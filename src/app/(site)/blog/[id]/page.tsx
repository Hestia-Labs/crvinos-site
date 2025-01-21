import { getBlogs } from '@/app/actions/getBlogs';
import { getWines } from '@/app/actions/getWines';
import { BlogPost } from '@/types/Blog';
import { Wine } from '@/types/Wine';
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

export default async function PostPage({ params }: Props) {
  const { id } = params;

  const blogPosts = (await getBlogs({ slug: id, shortVersion: false })) as BlogPost[];
  const blogPost = blogPosts[0];

  // Handle blog post not found scenario
  if (!blogPost) {
    return (
      <div className="flex flex-col min-h-screen">
        <h1 className="text-4xl text-crred mb-4">Publicación no encontrada</h1>
        <p className="text-gray-700 mb-8">
          Lo sentimos, no pudimos encontrar la publicación que buscas.
        </p>
      </div>
    );
  }

  // Fetch recommended wine
  const wines = (await getWines({ count: 10, shortVersion: false })) as Wine[];
  const recommendedWine = wines[Math.floor(Math.random() * wines.length)];

  return (
    <BlogPostPage blogPost={blogPost} recommendedWine={recommendedWine} />
  );
}
