// components/SanityImg.tsx
'use client';

import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { clientConfig } from '@/utils/sanity/config';

const builder = imageUrlBuilder(clientConfig);

type SanityImgProps = {
  source: any;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  mobileWidth?: number;
};

const SanityImg = ({
  source,
  alt,
  width = 500,
  height = 375,
  className = 'object-cover',
  sizes = '(max-width: 768px) 100vw, 500px',
  priority = false,
  mobileWidth = 600
}: SanityImgProps) => {
  const imageUrl = builder.image(source)
    .auto('format')
    .quality(90)
    .width(typeof window !== 'undefined' && window.innerWidth < 768 ? mobileWidth : width)
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
      fill
      className={className}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={blurUrl}
      priority={priority}
    />
  );
};

export default SanityImg;