import { object, z, TypeOf } from 'zod';

const CategorySchema = object({
  _id: z.string(),
  title: z.string(),
  image: z.string(),
  index: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = TypeOf<typeof CategorySchema>;

const CreateCategorySchema = object({
  title: z.string(),
  image: z.string(),
  index: z.number().int().optional(),
});

export type CreateCategory = TypeOf<typeof CreateCategorySchema>;

const Params = object({
  id: z.string(),
});

export type Params = TypeOf<typeof Params>;

const UpdateCategorySchema = object({
  title: z.string(),
  image: z.string(),
  index: z.number().int(),
}).partial();

export type UpdateCategory = TypeOf<typeof UpdateCategorySchema>;
