import { getAllVideosSchema } from '@/validations/videoSchema';
import { publicProcedure, router } from "../init";
import {
    getAllVideos,
} from "./controller";


const videoRouter = router({
    getAll: publicProcedure
        .input(getAllVideosSchema)
        .query(({ input }) => getAllVideos(input)),
});

export default videoRouter;

export type VideoRouter = typeof videoRouter;
