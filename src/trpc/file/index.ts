import { getFiles } from "@/queries/files/getFiles";
import * as controller from "./controller";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../init";
import * as schema from "@/validations/fileSchema";

const fileRouter = router({
  list: publicProcedure
    .input(schema.getFilesSchema)
    .query(({ input }) => getFiles(input)),

  signedUrl: protectedProcedure
    .input(schema.signedUrlSchema)
    .mutation(({ input }) => controller.generateS3Url(input)),

  upload: protectedProcedure
    .input(schema.uploadSchema)
    .mutation(({ input, ctx }) => controller.uploadToDB(input, ctx.session)),

  delete: protectedProcedure
    .input(schema.deleteFileSchema)
    .mutation(({ input }) => controller.deleteFile(input)),
});

export default fileRouter;

export type FileRouter = typeof fileRouter;
