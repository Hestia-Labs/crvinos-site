export interface InstagramPost {
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
  postUrl: string;
  caption: string;
}
