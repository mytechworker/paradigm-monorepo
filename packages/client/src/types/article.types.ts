import { object, z, TypeOf } from 'zod';

const ArticleSchema = object({
  _id: z.string(),
  title: z.string(),
  image: z.string(),
  index: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Article = TypeOf<typeof ArticleSchema>;

const CreateArticleSchema = object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  company: z.string(),
  categories: z.string(),
  authorName: z.string(),
  authorImage: z.string().optional(),
  readtime: z.number().int(),
  status: z.boolean().optional(),
  tags: z.array(z.string()),
  dateOfPublish: z.date(),
}).partial();

export type CreateArticle = TypeOf<typeof CreateArticleSchema>;

const UpdateArticleSchema = object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  content: z.string(),
  company: z.string(),
  categories: z.string(),
  authorName: z.string(),
  authorImage: z.string().optional(),
  readtime: z.number().int(),
  status: z.boolean().optional(),
  tags: z.array(z.string()),
  dateOfPublish: z.date(),
}).partial();

export type UpdateArticle = TypeOf<typeof UpdateArticleSchema>;

const Params = object({
  id: z.string(),
});

export type Params = TypeOf<typeof Params>;
