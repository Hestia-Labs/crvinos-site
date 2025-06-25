'use server';

import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';

// Location IDs for collection thumbnails in Sanity
const COLLECTION_THUMBNAIL_LOCATIONS = {
  recuento: 'recuento-thumb',
  hermelinda: 'hermelinda-thumb',
  dbc: 'dbc-thumb'
};

export async function getCollectionThumbnails() {
  // Get all collection thumbnail images
  const locationIds = Object.values(COLLECTION_THUMBNAIL_LOCATIONS);
  const images = await getImagesByLocationIds(locationIds);
  
  // Create a map of collection name to image URL
  const collectionImages: Record<string, string> = {};
  
  images.forEach(img => {
    // Map location ID back to collection name
    const collection = Object.entries(COLLECTION_THUMBNAIL_LOCATIONS)
      .find(([_, locId]) => locId === img.locationId)?.[0];
      
    if (collection && img.image.asset?.url) {
      // Store with capitalized collection name
      const formattedName = collection.charAt(0).toUpperCase() + collection.slice(1);
      collectionImages[formattedName] = img.image.asset.url;
    }
  });
  
  return collectionImages;
} 