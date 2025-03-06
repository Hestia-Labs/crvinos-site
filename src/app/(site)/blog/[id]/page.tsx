import { getBlogs } from '@/app/actions/getBlogs';
import { getWines } from '@/app/actions/getWines';
import { BlogPost } from '@/types/Blog';
import { Wine } from '@/types/Wine';
import type { Metadata } from 'next';
import BlogPostPage from '@/components/Part/Blog/BlogPost';
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
      <div className="flex flex-col relative space-y-9">
        <Navbar relative red redLogo />
        <div className="flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6">
          <div className="mt-4 space-y-8 w-full">
            <div className="flex flex-col relative space-y-8 w-full items-center">
              <div className="flex flex-col items-center justify-center space-y-6 py-9 px-4 md:px-12 h-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-crred italic tracking-wide mb-2">
                Publicación no encontrada
                </h1>
                <p className="text-gray-700 text-base sm:text-lg md:text-xl font-thin text-center">
                  Lo sentimos, no pudimos encontrar la publicación que buscas.
                </p>
                <Link href="/blog" className="text-crred underline">
                  Volver a la página del Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
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
