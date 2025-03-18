import { User } from '@/models';
import ReferralCode from '@/models/referralCode';
import { TRPCError } from '@trpc/server';

export async function createReferralCode(userId: string) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found",
            });
        }
        const referralCode = user.userName

        const referralCodeRecord = await ReferralCode.create({
            code: referralCode,
            user: userId,
            expiresAt: new Date(Date.now() + 2592000000), // 30 days expiry
        });

        user.referralCode = referralCodeRecord.code;
        await user.save();

        return referralCodeRecord;
    } catch (error) {
        console.error("Error creating referral code:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create referral code",
            cause: error,
        });
    }
}
