import { object, TypeOf, z } from 'zod';

export const userSchema = object({
    _id: z.string().optional(),
    privacy: z.boolean().default(false),
    role: z.string().default('user'),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    image: z.string().optional(),
    bannerImage: z.string().optional(),
    following_company: z.array(z.string()).optional(),
    verificationToken: z.string().optional(),
    oauth_id: z.string().optional(),
});

export type User = TypeOf<typeof userSchema>;

export const userLoginSchema = object({
    email: z.string().email(),
    password: z.string(),
    loginType: z.string(),
});

export type UserLogin = TypeOf<typeof userLoginSchema>;

export const userUpdateSchema = object({
    privacy: z.boolean(),
    role: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    image: z.string(),
    bannerImage: z.string(),
    following_company: z.array(z.string()),
    verificationToken: z.string(),
    oauth_id: z.string(),
}).partial();

export type UserUpdate = TypeOf<typeof userUpdateSchema>;

export const userForgotPasswordSchema = object({
    email: z.string().email(),
});

export type UserForgotPassword = TypeOf<typeof userForgotPasswordSchema>;

export const userResetPasswordSchema = object({
    password: z.string().min(8).max(100),
});

export type UserResetPassword = TypeOf<typeof userResetPasswordSchema>;
