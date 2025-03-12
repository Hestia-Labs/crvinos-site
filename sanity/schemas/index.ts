import eventSchema from "./event-schema";
import { wineSchema, collectionSchema } from "./wine-schema";
import { blogSchema, authorSchema } from "./blog-schema";
import { instagramSchema } from "./instagram-schema";
import { notificationBar } from "./notificationBar-schema";
import { notificationPop } from "./notificationPop-schema";
import page from "./page-schema";
import { experienceSchema, experienceCategorySchema } from "./experiences-schema";
import { Images } from "./images-schema"

const schemas: any = [
  eventSchema,
  wineSchema,
  collectionSchema,
  blogSchema,
  authorSchema,
  instagramSchema,
  notificationBar,
  notificationPop,
  page,
  experienceSchema,
  experienceCategorySchema,
  Images
];

export default schemas;