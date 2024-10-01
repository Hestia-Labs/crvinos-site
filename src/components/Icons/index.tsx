import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  link?: string;
  newPage?: boolean;

  [key: string]: any;  
}

const Icon: React.FC<IconProps> = ({ name, className = '', link = '', newPage = false, ...props }) => {
    const { newPage: __, ...filteredProps } = props;

    const svgElement = (
        <img
            src={`/img/icons/${name}.svg`}
            alt={`${name} icon`}
            className={className}
            {...filteredProps}   
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

