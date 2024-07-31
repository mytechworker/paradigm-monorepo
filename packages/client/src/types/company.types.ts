import { object, z, TypeOf } from 'zod';

const CompanySchema = object({
  _id: z.string(),
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
      }),
    )
    .optional(),
  totalFollowers: z.number().optional(),
});

export type Company = TypeOf<typeof CompanySchema>;

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
      }),
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
    }),
  ),
  totalFollowers: z.number(),
}).partial();

export type UpdateCompany = TypeOf<typeof UpdateCompanySchema>;

const Params = object({
  id: z.string(),
});

export type Params = TypeOf<typeof Params>;
