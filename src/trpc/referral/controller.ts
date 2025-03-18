import Influencer from '@/models/influencer';
import Referral from '@/models/Referral';
import { TRPCError } from "@trpc/server";

export const getReferralsList = async (input: { page: number; limit: number; userId: string }) => {
    const { page, limit, userId } = input;

    try {
        const validPage = page > 0 ? page : 0;
        const validLimit = limit || 100;

        const totalReferrals = await Referral.estimatedDocumentCount();

        const influencers = await Influencer.find({ user: userId }).select("_id");
        const influencerIds = influencers.map((inf) => inf._id);
        const referrals = await Referral.find({
            influencer: { $in: influencerIds },
        })
            .sort({ createdAt: 1 })
            .skip(validPage * validLimit)
            .limit(validLimit)
            .lean();

        return { totalReferrals, referrals };
    } catch (error) {
        console.error("Error fetching referrals:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch referrals",
            cause: error,
        });
    }
};

// Update referral
export const updateReferral = async (input: { _id: string; mutation: Record<string, unknown> }) => {
    const { _id, mutation } = input;

    try {
        const existingReferral = await Referral.findById(_id);
        if (!existingReferral) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Referral not found!",
            });
        }

        const isBecomingRefund = (mutation.isRefund === true && existingReferral.isRefund !== true) || (mutation.commissionSent === true && existingReferral.commissionSent !== true)

        const updatedReferral = await Referral.findByIdAndUpdate(_id, mutation, { new: true });

        if (!updatedReferral) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Referral not found after update!",
            });
        }
        const isCommissionUpdate = (!existingReferral.isRefund && !existingReferral.commissionSent)
        if (true) {
            await Influencer.findByIdAndUpdate(
                updatedReferral.influencer,
                { $inc: { totalCommission: (isBecomingRefund && isCommissionUpdate) ? -updatedReferral.commission : updatedReferral.commission } }
            );
        }

        return { referral: updatedReferral, message: "Referral updated successfully." };
    } catch (error) {
        console.error("Error updating referral:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update referral",
            cause: error,
        });
    }
};


export const getInfluencersList = async (page: number = 1, limit: number = 10) => {
    try {
        const totalInfluencers = await Influencer.estimatedDocumentCount();
        const totalPages = Math.ceil(totalInfluencers / limit);

        const influencers = await Influencer.aggregate([
            {
                $lookup: {
                    from: "referrals",
                    localField: "_id",
                    foreignField: "influencer",
                    as: "referrals",
                },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);

        if (!influencers.length) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "No influencers found!",
            });
        }

        return {
            totalInfluencers,
            totalPages,
            currentPage: page,
            influencers,
        };
    } catch (error) {
        console.error("Error fetching influencer:", error);
        return {
            totalInfluencers: 0,
            totalPages: 0,
            currentPage: 1,
            influencers: [],
        };
    }
};
