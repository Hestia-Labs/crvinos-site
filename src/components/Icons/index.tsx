import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  link?: string;
  [key: string]: any;  
  newPage?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, className = '', link = '', newPage = false, ...props }) => {
    const svgElement = (
        <img
            src={`/img/icons/${name}.svg`}
            className={className}
            alt={`${name} icon`}
            {...props}
        />
    );

    return link ? (
        <a 
            href={link} 
            className={className} 
            {...(newPage ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            {svgElement}
        </a>
    ) : (
        svgElement
    );
};

export default Icon;
