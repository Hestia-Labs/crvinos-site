import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  link?: string;
  [key: string]: any;  
}

const Icon: React.FC<IconProps> = ({ name, className = '', link = '', ...props }) => {
    const svgElement = (
        <img
            src={`/img/icons/${name}.svg`}
            className={className}
            alt={`${name} icon`}
            {...props}
        />
    );

    return link ? (
        <a href={link} className={className}>
            {svgElement}
        </a>
    ) : (
        svgElement
    );
};

export default Icon;
