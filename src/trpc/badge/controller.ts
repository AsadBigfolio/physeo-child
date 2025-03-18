import {Badge} from "@/models";
import { BadgeCreateType, BadgeDeleteType, BadgeUpdateType } from '@/validations/badgeSchema';

export const createBadge = async (badge: BadgeCreateType) => {
  try {
    const newBadge = await Badge.create(badge);

    return { badge: newBadge };
  } catch (error) {
    throw new Error(`Failed to create badge: ${error.message}`);
  }
};

export const updateBadge = async (badge: BadgeUpdateType) => {
  const { id, ...rest } = badge
  try {
    const updatedBadge = await Badge.findByIdAndUpdate(id, rest, { new: true });

    if (!updatedBadge) {
      throw new Error("Badge not found.");
    }

    return { badge: updatedBadge };
  } catch (error) {
    throw new Error(`Failed to update badge: ${error.message}`);
  }
};
export const deleteBadge = async (ids: BadgeDeleteType) => {
  try {
    if (Array.isArray(ids)) {
      const deletedBadges = await Badge.deleteMany({ _id: { $in: ids } });
      if (deletedBadges.deletedCount === 0) {
        throw new Error("No badges found to delete.");
      }
      return { message: `${deletedBadges.deletedCount} badge(s) deleted.` };
    } else {
      const deletedBadge = await Badge.findByIdAndDelete(ids);
      if (!deletedBadge) {
        throw new Error("Badge not found.");
      }
      return { message: "Badge deleted." };
    }
  } catch (error) {
    throw new Error(`Failed to delete badge: ${error.message}`);
  }
};
