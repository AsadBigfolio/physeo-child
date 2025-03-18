import { publicProcedure, router } from "../init";
import { z } from 'zod';
import { createEmailUser, sendNewsletter } from './controller';

const newsLetterRouter = router({
    sendNewsletter: publicProcedure
        .input(
            z.object({
                emails: z.array(z.string().email('Invalid recipient email address')),
                message: z.string().min(1, 'Message is required'),
            })
        )
        .mutation(({ input }) => sendNewsletter(input)),
    createEmailUser: publicProcedure
        .input(
            z.object({
                email: z.string().email("Invalid email address"),
            })
        )
        .mutation(async ({ input }) => {
            return await createEmailUser(input.email);
        }),
});

export default newsLetterRouter;

export type ContactRouter = typeof newsLetterRouter;
