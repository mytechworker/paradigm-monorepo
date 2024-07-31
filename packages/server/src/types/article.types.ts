import { object, z, TypeOf } from 'zod';

import { ObjectId } from 'mongoose';

const CreateArticleSchema = object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    content: z.string(),
    company: z.custom<ObjectId>().optional(),
    categories: z.custom<ObjectId>().optional(),
    authorName: z.string(),
    authorImage: z.string().optional(),
    readtime: z.number().int(),
    status: z.boolean().optional(),
    tags: z.array(z.string()),
    dateOfPublish: z.date(),
});

export type CreateArticle = TypeOf<typeof CreateArticleSchema>;

const UpdateArticleSchema = object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    content: z.string(),
    company: z.custom<ObjectId>(),
    categories: z.custom<ObjectId>(),
    authorName: z.string(),
    authorImage: z.string(),
    readtime: z.number().int(),
    status: z.boolean(),
    tags: z.array(z.string()),
    dateOfPublish: z.date(),
}).partial();

export type UpdateArticle = TypeOf<typeof UpdateArticleSchema>;
