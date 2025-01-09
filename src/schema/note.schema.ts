import { z } from 'zod';

export const noteSchema = z.object({
    title: z.string(),
    description: z.string(),
});