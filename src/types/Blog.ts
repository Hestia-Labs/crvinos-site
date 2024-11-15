import {PortableTextBlock} from '@portabletext/types'

export type ImageAsset = {
    _id: string;
    url: string;
  };
  
  export type ImageType = {
    asset: ImageAsset;
    alt?: string;
  };
  
  export type Author = {
    name: string;
    image?: ImageType;
    social?: string;
  };
  
  export type BlogPostShort = {
    _id: string;
    title: string;
    shortDescription: string;
    publishedDate: string;
    slug: string;
    bannerImage?: ImageType;
  };
  
  export type BlogPost = BlogPostShort & {
    content: PortableTextBlock[];
    tags?: string[];
    author?: Author;
  };
  