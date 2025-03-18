import { publicProcedure, router } from "../init";
import { sendMessage } from './controller';
import { z } from 'zod';

const contactRouter = router({
    sendMessage: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, 'Name is required'),
                email: z.string().email('Invalid email address'),
                message: z.string().min(1, 'Message is required'),
            })
        )
        .mutation(({ input }) => sendMessage(input)),
});

export default contactRouter;

export type ContactRouter = typeof contactRouter;
