import { Plan } from "@/models";

export const getPlans = async () => {
  try {
    const plans = await Plan.find();
    return plans;
  } catch (error) {
    throw new Error(error.message);
  }
};
