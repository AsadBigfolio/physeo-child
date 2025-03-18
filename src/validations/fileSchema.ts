import { z } from "zod";

export const signedUrlSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
});

export const uploadSchema = z.array(
  z.object({
    type: z.string(),
    src: z.string(),
    size: z.number(),
    name: z.string(),
  })
);

export const getFilesSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  search: z.string().optional().nullable(),
});

export const deleteFileSchema = z.object({
  id: z.string()
});

export type SignedUrlType = z.infer<typeof signedUrlSchema>;
export type UploadTODBType = z.infer<typeof uploadSchema>;
export type GetFilesType = z.infer<typeof getFilesSchema>;
export type DeleteFileType = z.infer<typeof deleteFileSchema>;
