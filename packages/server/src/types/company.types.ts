import { object, z, TypeOf } from 'zod';

import { ObjectId } from 'mongoose';

const CreateCompanySchema = object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    bannerImage: z.string(),
    index: z.number().int().optional(),
    numArr: z
        .array(
            z.object({
                number: z.number(),
                title: z.string(),
                description: z.string(),
            })
        )
        .optional(),
    totalFollowers: z.number().optional(),
});

export type CreateCompany = TypeOf<typeof CreateCompanySchema>;

const UpdateCompanySchema = object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    bannerImage: z.string(),
    index: z.number().int(),
    numArr: z.array(
        z.object({
            number: z.number(),
            title: z.string(),
            description: z.string(),
        })
    ),
    totalFollowers: z.number(),
}).partial();

export type UpdateCompany = TypeOf<typeof UpdateCompanySchema>;

const CompanyResponseSchema = object({
    _id: z.custom<ObjectId>((id) => id),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    bannerImage: z.string(),
    index: z.number().int(),
    numArr: z.array(
        z.object({
            number: z.number(),
            title: z.string(),
            description: z.string(),
        })
    ),
    totalFollowers: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CompanyResponse = TypeOf<typeof CompanyResponseSchema>;
