export type NotificationBar = {
  message: string;
  link?: string;
  isActive: boolean;
};

export type NotificationPop = {
  banner: {
    url: string;
    alt?: string; 
  };
  title: string;
  subtitle?: string;
  contentType: 'custom' | 'event' | 'experience';
  link?: string;
  eventReference?: {
    _ref: string;
    title: string;
    slug: {
      current: string;
    };
    dates: {
      start: string;
      end: string;
    };
    poster: {
      url: string;
    };
  };
  experienceReference?: {
    _ref: string;
    title: string;
    slug: {
      current: string;
    };
    coverImage?: {
      url: string;
    };
  };
  buttonText: string;
  displayOptions: {
    frequency: 'everyVisit' | 'daily' | 'weekly' | 'once';
    delay: number;
  };
  isActive: boolean;
};
