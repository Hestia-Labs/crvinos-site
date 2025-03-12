import { getExperiences } from '@/app/actions/getExperiences';
import ExperiencePageClient from '@/components/Part/Experiences/SingleExperience';
import { Experience } from '@/types/Experience';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com';

export const generateMetadata = async ({ params }: { params: { experience: string } }): Promise<Metadata> => {
  const experiences = await getExperiences({ slug: params.experience, shortVersion: false }) as Experience[];
  if (experiences.length === 0) {
    return {
      title: 'Experiencia no encontrada | CR Vinos MX',
      description: 'La experiencia que buscas no está disponible.',
    };
  }

  const experience = experiences[0];
  const formattedSlug = experience.title || params.experience
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedSlug} | CR Vinos MX | Experiencias únicas`,
    description: experience.basicDescription || 'Descubre las experiencias únicas que ofrecemos en CR Vinos MX.',
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: [experience.category, 'CR Vinos MX', 'experiencia', 'vino', 'aventura', 'descubrimiento'],
    openGraph: {
      title: `${formattedSlug} | CR Vinos MX | Experiencias únicas`,
      description: experience.basicDescription || 'Descubre las experiencias únicas que ofrecemos en CR Vinos MX.',
      url: `${siteUrl}/experiences/${params.experience}`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: experience.mainImage.asset.url || `${siteUrl}/img/crvinosmxLogo.jpg`,
          width: 300,
          height: 225,
          alt: experience.title || "CR Vinos MX",
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedSlug} | CR Vinos MX | Experiencias únicas`,
      description: experience.basicDescription || 'Descubre las experiencias únicas que ofrecemos en CR Vinos MX.',
      images: [experience.mainImage.asset.url  || `${siteUrl}/img/crvinosmxLogo.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/experiences/${params.experience}`,
      languages: {
        'es-ES': `${siteUrl}/experiences/${params.experience}`,
      },
    },
    appleWebApp: {
      title: 'CR Vinos MX',
      statusBarStyle: 'black-translucent',
    },
  };
};

export default async function ExperiencePage({ 
  params 
}: { 
  params: { experience: string } 
}) {
  // Get current experience
  const [experience] = await getExperiences({ 
    slug: params.experience,
    shortVersion: false
  }) as Experience[];

  // Get all experiences for navigation
  const allExperiences = await getExperiences({}) as Experience[];

  const currentIndex = allExperiences.findIndex(e => e.slug === params.experience);
  
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : allExperiences.length - 1;
  const nextIndex = (currentIndex + 1) % allExperiences.length;

  return (
    <ExperiencePageClient
      experience={experience}
      prevExperience={allExperiences[prevIndex]}
      nextExperience={allExperiences[nextIndex]}
    />
  );
}