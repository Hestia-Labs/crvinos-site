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

  if (banner) {
    // For banner images, calculate dimensions based on the viewport while preserving the aspect ratio.
    const [bannerSize, setBannerSize] = useState({ width: 1920, height: 576 });

    useEffect(() => {
      const computeBannerSize = () => {
        const vw = window.innerWidth;
        const requestedWidth = Math.min(vw, 1920);
        const requestedHeight = Math.round(requestedWidth * (576 / 1920)); // Maintain the 1920:576 ratio.
        setBannerSize({ width: requestedWidth, height: requestedHeight });
      };
      computeBannerSize();
      window.addEventListener('resize', computeBannerSize);
      return () => window.removeEventListener('resize', computeBannerSize);
    }, []);

    const imageUrl = builder.image(source)
      .auto('format')
      .quality(qualityValue)
      .width(bannerSize.width)
      .height(bannerSize.height)
      .fit('crop')
      .crop('focalpoint')
      .url();

    const blurUrl = builder.image(source)
      .width(20)
      .quality(20)
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
      />
    );
  } else {
    // Non-banner mode: use fixed dimensions.
    const imageUrl = builder.image(source)
      .auto('format')
      .quality(qualityValue)
      .width(width)
      .height(height)
      .fit('crop')
      .crop('focalpoint')
      .url();

    const blurUrl = builder.image(source)
      .width(20)
      .quality(20)
      .url();

    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className || 'object-cover'}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
        placeholder="blur"
        blurDataURL={blurUrl}
        priority={priority}
      />
    );
  }
};

export default SanityImg;
