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
  link?: string;
  isActive: boolean;
};
