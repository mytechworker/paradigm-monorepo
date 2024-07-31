import { object, z, TypeOf } from 'zod';

import { ObjectId } from 'mongoose';

const CreateCategorySchema = object({
    title: z.string(),
    image: z.string(),
    index: z.number().int().optional(),
});

export type CreateCategory = TypeOf<typeof CreateCategorySchema>;

const UpdateCategorySchema = object({
    title: z.string(),
    image: z.string(),
    index: z.number().int(),
}).partial();

export type UpdateCategory = TypeOf<typeof UpdateCategorySchema>;

const CategoryResponseSchema = object({
    _id: z.custom<ObjectId>((id) => id),
    title: z.string(),
    image: z.string(),
    index: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CategoryResponse = TypeOf<typeof CategoryResponseSchema>;
