import React from 'react';


interface IconProps {
  name: string;
  className?: string;
  link?: string;
  [key: string]: any;  
}

const Icon: React.FC<IconProps> = async ({ name,  className = '', link = '', ...props }) => {


    const imageElement = (
        <img
        src={`/img/${name}.png`}
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
