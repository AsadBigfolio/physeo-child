import { z } from "zod";
import { publicProcedure, router } from '../init';
import { getReferralsList, updateReferral } from './controller';

const ReferralUpdateSchema = z.object({
    _id: z.string(),
    mutation: z.record(z.unknown()),
});

export const referralRouterr = router({
    getReferralsList: publicProcedure
        .input(
            z.object({
                page: z.number().default(0),
                limit: z.number().default(100),
                userId: z.string(),
            })
        )
        .query(async ({ input }) => getReferralsList(input)),

    updateReferral: publicProcedure.input(ReferralUpdateSchema).mutation(async ({ input }) => updateReferral(input)),
});
