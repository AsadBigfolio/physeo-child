import { router } from "./init";
// router must be imported before other routers

import userRouter from "./user";
import courseRouter from "./course";
import fileRouter from "./file";
import blogRouter from "./blog";
import userCourseRouter from "./userCourse";
import storyRouter from "./story";
import badgeRouter from "./badge";
import testimonialRouter from "./testimonial";
import planRouter from "./plan";
import stripeRouter from "./stripe";
import OtpRouter from "./otp";
import ForgetPasswordRouter from "./ForgetPassword";
import videoRouter from './video';
import contactRouter from './contactUs';
import newsLetterRouter from './newsLetter';
import discountCodeRouter from './discountCodes';
import referralRouter from './referralCode';
import { referralRouterr } from './referral';

export const appRouter = router({
  user: userRouter,
  course: courseRouter,
  file: fileRouter,
  blog: blogRouter,
  userCourse: userCourseRouter,
  story: storyRouter,
  badge: badgeRouter,
  testimonial: testimonialRouter,
  plan: planRouter,
  stripe: stripeRouter,
  otp: OtpRouter,
  ForgetPassword: ForgetPasswordRouter,
  video: videoRouter,
  contactUs: contactRouter,
  newsLetter: newsLetterRouter,
  discountCode: discountCodeRouter,
  referralCode: referralRouter,
  referral: referralRouterr,
});

export type AppRouter = typeof appRouter;
