// components/Icons/index.tsx

import React from 'react';
import Image from 'next/image';

interface IconProps {
  name?: string;
  className?: string;
  link?: string;
  newPage?: boolean;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  link = '',
  newPage = false,
  ...props
}) => {
  const imagePath = name ? (name.startsWith('/') ? name : `/img/icons/${name}.svg`) : '';
  const altText = name ? `${name} icon` : 'icon';

  const svgElement = (
    <Image
      src={imagePath}
      alt={altText}
      className={className}
      width={0}
      height={0}
      sizes="100vw"
      {...props}
    />
  );

  return link ? (
    <a
      href={link}
      {...(newPage ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {svgElement}
    </a>
  ) : (
    svgElement
  );
};

export default Icon;
