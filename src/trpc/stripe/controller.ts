
import { Plan, SubscribedPlan, User } from "@/models";
import Influencer from '@/models/influencer';
import Referral from '@/models/Referral';
import ReferralCode from '@/models/referralCode';
import { selectedDiscount } from '@/queries/discountCodes/getSelectedDiscount';
import { FREEPLAN, PREMIUMPLAN } from '@/utils/constant';
import loadSession from "@/utils/session";
import stripe from '@/utils/stripe';
import { TRPCError } from "@trpc/server";
import mongoose from 'mongoose';

const setPremiumPlan = async (input: {
  plan: string;
  paymentMethod?: string;
  paymentId?: string;
  userId?: string;
}): Promise<{ success: boolean; message: string; subscription?: any }> => {
  const { userId } = input
  try {
    if (!input.plan) {
      return { success: false, message: 'Plan is required.' };
    }

    const session = await loadSession();
    if (!session?.user?.id) {
      return { success: false, message: 'User session not found.' };
    }
    const existingSubscribedPlans = await SubscribedPlan.find({
      user: userId ?? session.user.id,
      plan: new mongoose.Types.ObjectId(input?.plan),
      isActive: true
    });

    if (existingSubscribedPlans.length) {
      throw new Error(
        JSON.stringify([
          {
            message: "Already subscribed this plan.",
            path: ["subscribedPlans"],
          },
        ])
      );
    }

    const user = await User.findById(userId ?? session.user.id);


    await SubscribedPlan.updateMany(
      { user: userId ?? session.user.id },
      { $set: { isActive: false } }
    );

    const subscription = await SubscribedPlan.create({
      user: userId ?? session.user.id,
      plan: input.plan,
      paymentMethod: input.paymentMethod,
      paymentId: input.paymentId,
    });

    if (user) {
      user.subscribedPlans = [subscription?._id];
      await user?.save();
    }

    return { success: true, message: 'Subscription created successfully.', subscription };

  } catch (error) {
    console.error('Error setting premium plan:', error);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: error.message,
    });
  }
};

export const createOrder = async (input: {
  plan: string;
  courses?: string[];
  paymentMethod?: string;
  paymentId?: string;
  userId?: string;
}) => {
  const { userId } = input
  const session = await loadSession();

  if (session && session.user) {
    const user = await User.findById(userId ?? session.user.id);
    if (input.plan === PREMIUMPLAN || input.plan === FREEPLAN) {
      const { plan, paymentId, paymentMethod } = input
      await setPremiumPlan({ plan, paymentId, paymentMethod, userId })
      return
    }
    const getActivatedPlan = await SubscribedPlan.find(
      {
        user: userId ?? session.user.id,
        isActive: true,
        plan: { $ne: new mongoose.Types.ObjectId(input.plan) },
      },
    );
    if (user && getActivatedPlan.length) {
      const deactivatedPlanIds = getActivatedPlan.map(plan => plan._id);
      user.subscribedPlans = user.subscribedPlans.filter(id =>
        !deactivatedPlanIds.some(deactivatedId => deactivatedId.equals(id))
      );
      await user.save()
    }
    await SubscribedPlan.updateMany(
      {
        user: userId ?? session.user.id,
        isActive: true,
        plan: { $ne: new mongoose.Types.ObjectId(input.plan) },
      },
      { $set: { isActive: false } }
    );

    const subscribedPlans = await SubscribedPlan.find({
      user: userId ?? session.user.id,
      isActive: true,
    })
      .populate({
        path: "course",
        select: "title",
      })
      .exec();

    const alreadySubscribedPlans = subscribedPlans.reduce(
      (acc: string[], curr) => {
        const courseTitle = curr.course?._id.toString();
        if (courseTitle) {
          acc.push(courseTitle);
        }
        return acc;
      },
      []
    );

    for (const course of input.courses || []) {
      console.log("course is", alreadySubscribedPlans.includes(course));
      if (alreadySubscribedPlans.includes(course)) {
        console.log("You are already subscribed to this course");
        // throw new TRPCError({
        //   code: "FORBIDDEN",
        //   message: "You are already subscribed to this course",
        // });
        continue; // skipping the current iteration
      }

      const subscription = await SubscribedPlan.create({
        user: userId ?? session.user.id,
        plan: input.plan,
        course,
        paymentMethod: input.paymentMethod,
        paymentId: input.paymentId,
      });

      if (user) {
        if (!user?.subscribedPlans) {
          user.subscribedPlans = [];
        }

        user.subscribedPlans.push(subscription._id);
        await user?.save();
      }
    }
  }
};

const afterDiscountAmount = (amount: any, selectedDiscount: any, referredBy?: any): number => {
  if (selectedDiscount?.success && referredBy) {
    const discountedAmount = amount - ((Number(selectedDiscount?.selectedDiscount?.percentage) * amount) / 100);
    return parseFloat(discountedAmount.toFixed(2));
  }
  return parseFloat(amount.toFixed(2));
};

const updateInfluencer = async (id: string, existingUser: any, commissions: number, plan: string) => {

  let influencer = await Influencer.findOne({
    user: id,
  });
  if (!influencer) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    const { email: influencerEmail, userName: influencerUserName } = user;

    influencer = await Influencer.create({
      email: influencerEmail,
      userName: influencerUserName,
      user: id,
      totalReferrals: 1,
      totalCommission: commissions,
    });
  } else {
    await Influencer.updateOne(
      {
        user: id,
      },
      {
        $inc: {
          totalReferrals: 1,
          totalCommission: commissions, 
        },
      },
      {
        new: true,
      }
    );
  }
  await Referral.create({
    influencer: influencer._id,
    student: existingUser._id,
    studentEmail: existingUser.email,
    studentName: existingUser.userName,
    plan: {
      planName: plan,
    },
    commission: commissions
  });
}
export const processReferralDiscount = async (userName: string, plan: string, amount: string): Promise<number> => {
  const session = await loadSession();

  const existingUser = await User.findById(session?.user?.id);
  if (!existingUser) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }
  const referralCode = await ReferralCode.findOne({ code: userName });
  const influencer = await User.findOne({ userName: userName });

  if (!referralCode) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invalid referral code",
    });
  }

  if (!influencer) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Influencer not found.",
    });
  }

  // Check if user has already used this referral code
  const hasUsedReferral = referralCode.usedBy.some(
    (entry: any) => entry?.user.toString() === existingUser._id.toString()
  );

  if (hasUsedReferral) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You have already used this referral link.",
    });
  }

  // Apply discount
  const discount = await selectedDiscount();
  if (!discount) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Discount Code not found for you.",
    });
  }

  const finalAmount = afterDiscountAmount(amount, discount, userName);

  const commissions = (finalAmount / 100) * (discount?.selectedDiscount?.percentage ?? 0);
  await updateInfluencer(influencer._id.toString(), existingUser, commissions, plan);
  await ReferralCode.updateOne(
    { _id: referralCode._id },
    {
      $push: {
        usedBy: {
          user: existingUser._id,
          dateUsed: new Date(),
        },
      },
    }
  );

  return finalAmount;
};

export const createPaymentIntent = async (input: { amount: string; userName?: string, plan: string }) => {
  const { amount, userName, plan } = input;

  try {
    const session = await loadSession();
    if (!session?.user?.id) {
      return { success: false, message: 'User session not found.' };
    }

    const existingUser = await User.findById(session?.user?.id);
    if (!existingUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    let finalAmount = Number(amount);

    if (userName) {
      const referralCode = await ReferralCode.findOne({ code: userName });

      if (!referralCode) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid referral code",
        });
      }
      const hasUsedReferral = referralCode.usedBy.some(
        (entry: any) => entry?.user.toString() === existingUser._id.toString()
      );

      if (hasUsedReferral) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You have already used this referral link.",
        });
      }

      const discount = await selectedDiscount();
      if (!discount) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Discount Code not found for you.",
        });
      }

      finalAmount = afterDiscountAmount(amount, discount, userName);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Convert to cents
      currency: "usd",
    });

    return paymentIntent.client_secret;

  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error instanceof TRPCError ? error.message : "Failed to create PaymentIntent",
      cause: error,
    });
  }
};


