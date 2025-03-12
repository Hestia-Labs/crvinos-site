// app/experiences/page.tsx
import { getExperiences, getExperienceCategories } from '@/app/actions/getExperiences';
import ExperiencesList from '@/components/Part/Experiences';
import { ExperienceShort } from '@/types/Experience';
import Icon from '@/components/Icons';
import Navbar from '@/components/Navbar';

async function groupExperiencesByCategory(experiences: ExperienceShort[], categories: string[]) {
  const grouped: Record<string, ExperienceShort[]> = {};
  categories.forEach(category => {
    const categoryExperiences = experiences.filter(exp => exp.category === category);
    if (categoryExperiences.length > 0) {
      grouped[category] = categoryExperiences;
    }
  });
  return grouped;
}

export default async function ExperiencesPage() {
  try {
    const [experiencesData, categoriesData] = await Promise.all([
      getExperiences({ shortVersion: true }),
      getExperienceCategories()
    ]);

    const categories = categoriesData.map(c => c.title);
    const grouped = await groupExperiencesByCategory(experiencesData as ExperienceShort[], categories);

    return (
      <div className='relative flex flex-col w-full items-center justify-center'>
        <div className='relative w-full -z-10'>
          <Icon name='ContactVines' className='absolute h-80 w-full md:h-160 opacity-40' />
        </div>
        <Navbar clearBg redLogo red relative />
        <ExperiencesList
          experiencesByCategory={grouped}
          allExperiences={experiencesData as ExperienceShort[]}
          categories={categories}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return <div>Error loading experiences.</div>;
  }
}