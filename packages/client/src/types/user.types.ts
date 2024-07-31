import { z, object, TypeOf } from 'zod';

export const loginSchema = object({
  email: z.string().email({ message: 'email is required field.' }),
  password: z.string().max(12).min(8),
});

export type Login = TypeOf<typeof loginSchema>;

export const profileSchema = object({
  _id: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  privacy: z.boolean(),
  following_company: z.array(z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Profile = TypeOf<typeof profileSchema>;
