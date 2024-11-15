// components/Icons/index.tsx

import React from 'react';

interface IconProps {
  name: string;
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
  const svgElement = (
    <img
      src={`/img/icons/${name}.svg`}
      alt={`${name} icon`}
      className={className}
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
