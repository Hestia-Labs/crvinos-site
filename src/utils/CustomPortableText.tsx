import { PortableTextComponentProps } from '@portabletext/react';
import { PortableTextReactComponents } from '@portabletext/react';
import { PortableTextMarkComponentProps } from '@portabletext/react';


const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl md:text-4xl text-crred tracking-wide mb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl text-crred mb-2">{children}</h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-crred text-lg">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-gray-700 text-lg ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-crred text-lg ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-crred text-lg">{children}</li>
    ),
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps) => {
      const rel =
        value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value?.href || '#'}
          rel={rel}
          className="text-crred text-lg underline"
        >
          {children}
        </a>
      );
    },
  },
};

export { myPortableTextComponents };
