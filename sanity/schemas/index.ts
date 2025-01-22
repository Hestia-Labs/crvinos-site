import eventSchema from "./event-schema";
import {wineSchema, collectionSchema} from "./wine-schema";
import {blogSchema, authorSchema} from "./blog-schema";
import { instagramSchema } from "./instagram-schema";



const schemas: any = [eventSchema, wineSchema, collectionSchema, blogSchema, authorSchema, instagramSchema ];

export default schemas;