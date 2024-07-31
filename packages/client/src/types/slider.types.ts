import { object, z, TypeOf } from 'zod';

const SliderComponentPropsSchema = object({
  className: z.string().optional(),
});

export type SliderProps = TypeOf<typeof SliderComponentPropsSchema>;
