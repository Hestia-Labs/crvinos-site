import AgeVerModal from './AgeVerModal';

export default async function AgeVerification() {
 
  let country = '';
  let drinkingAge = 18;

  try {
    const response = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    
    if (response.ok) {
      const data = await response.json() as { country_name: string };
      country = data.country_name || '';

      if (country === 'United States') {
        drinkingAge = 21;
      }
    } else if (response.status === 429) {
      console.error('Failed to fetch geolocation: Too many requests. Please try again later.');
    } else {
      console.error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to fetch geolocation:', error instanceof Error ? error.message : error);
  }
 
  return (
      <AgeVerModal country={country} drinkingAge={drinkingAge} />
  );
}