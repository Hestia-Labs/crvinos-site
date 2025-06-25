'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { clientConfig } from '@/utils/sanity/config';

const builder = imageUrlBuilder(clientConfig);

type QualityTier = 'incredible' | 'high' | 'medium' | 'poor';

type SanityImgProps = {
  source: any;
  alt: string;
  /** Intended display width in pixels for non-banner images */
  width?: number;
  /** Intended display height in pixels for non-banner images */
  height?: number;
  className?: string;
  qualityTier?: QualityTier;
  banner?: boolean;
  priority?: boolean;
};

const qualityMapping: Record<QualityTier, number> = {
  incredible: 100,
  high: 90,
  medium: 70,
  poor: 50,
};

const SanityImg = ({
  source,
  alt,
  width = 500,
  height = 375,
  className,
  qualityTier = 'high',
  banner = false,
  priority = false,
}: SanityImgProps) => {
  const qualityValue = qualityMapping[qualityTier];
  const [bannerSize, setBannerSize] = useState({ width: 1920, height: 576 });
  const [isClient, setIsClient] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1024); // Default fallback

  useEffect(() => {
    setIsClient(true);
    setViewportWidth(window.innerWidth);
    
    if (!banner) return;
    
    const computeBannerSize = () => {
      const vw = window.innerWidth;
      setViewportWidth(vw);
      const requestedWidth = Math.min(vw, 1920);
      const requestedHeight = Math.round(requestedWidth * (576 / 1920)); // Maintain the 1920:576 ratio.
      setBannerSize({ width: requestedWidth, height: requestedHeight });
    };
    
    computeBannerSize();
    window.addEventListener('resize', computeBannerSize);
    return () => window.removeEventListener('resize', computeBannerSize);
  }, [banner]);

  // Don't process empty sources
  if (!source) {
    return (
      <div 
        className={`bg-gray-200 ${className || 'object-cover'}`} 
        style={{width: banner ? '100%' : width, height: banner ? '100%' : height}}
      />
    );
  }

  // Shared blur URL generation to avoid redundant processing
  const blurUrl = builder.image(source)
    .width(10) // Reduced from 20 to 10 for smaller placeholder
    .quality(10) // Reduced from 20 to 10 for faster loading
    .url();

  // Calculate responsive dimensions based on client state
  const isMobile = isClient && viewportWidth < 768;
  const responsiveWidth = isClient && !banner ? 
    (isMobile ? Math.min(width, viewportWidth - 40) : width) : 
    width;
  const aspectRatio = height / width;
  const responsiveHeight = Math.round(responsiveWidth * aspectRatio);

  if (banner) {
    // For banners, ensure high quality on all devices
    const imageUrl = builder.image(source)
      .auto('format')
      .quality(qualityValue)
      .width(bannerSize.width)
      .height(bannerSize.height)
      .fit('crop')
      .crop('focalpoint')
      .url();

    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="100vw"
        className={className || "w-full h-126 md:h-144 object-cover"}
        placeholder="blur"
        blurDataURL={blurUrl}
        priority={true}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  } else {
    // For non-banner images, implement responsive sizing while maintaining quality
    const imageUrl = builder.image(source)
      .auto('format')
      .quality(qualityValue)
      .width(responsiveWidth)
      .height(responsiveHeight)
      .fit('crop')
      .crop('focalpoint')
      .url();

    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={responsiveWidth}
        height={responsiveHeight}
        className={className || 'object-cover'}
        sizes={`(max-width: ${responsiveWidth}px) 100vw, ${responsiveWidth}px`}
        placeholder="blur"
        blurDataURL={blurUrl}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }
};

export default SanityImg;
