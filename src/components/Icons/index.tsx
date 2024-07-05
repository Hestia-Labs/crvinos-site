import React from 'react';
import Image from 'next/image';

interface IconProps {
  name: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  link?: string;
  [key: string]: any;  
}

const Icon: React.FC<IconProps> = async ({ name, width = 24, height = 24, className = '', link = '', ...props }) => {


    const imageElement = (
        <Image
        src={`/img/${name}.png`}
        width={Number(width)}
        height={Number(height)}
        className={className}
        alt={`${name} icon`}
        {...props}
        />
    );

    return link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {imageElement}
        </a>
    ) : (
        imageElement
    );
};

export default Icon;
