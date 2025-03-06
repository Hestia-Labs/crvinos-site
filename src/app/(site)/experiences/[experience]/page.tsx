// app/experiences/[experience]/page.tsx
import { getExperiences } from '@/app/actions/getExperiences';
import ExperiencePageClient from '@/components/Part/Experiences';
import { Experience } from '@/types/Experience';

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