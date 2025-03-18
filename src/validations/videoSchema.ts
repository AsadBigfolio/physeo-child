import { z } from 'zod';

export const getAllVideosSchema = z.object({
    searchQuery: z.string().optional(),
});
export type getAllVideosType = z.infer<typeof getAllVideosSchema>