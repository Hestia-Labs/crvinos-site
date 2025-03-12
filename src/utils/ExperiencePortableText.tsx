import { PortableTextReactComponents } from '@portabletext/react';

export const experiencePortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 text-lg md:text-2xl font-light leading-relaxed mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl text-crred font-medium mb-4 mt-8">{children}</h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-crred pl-4 text-gray-600 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-crred hover:text-crred-dark underline">
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-crred">{children}</strong>
    ),
  },
};