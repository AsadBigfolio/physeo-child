import AdminDiscountCode from '@/models/DiscountCode';
import { DisCountCodeCreateType, DisCountCodeDeleteType, DisCountCodeUpdateType } from '@/validations/discountCodeSchema';

export const createDiscount = async (discountCode: DisCountCodeCreateType) => {
  try {
    const newDiscountCode = await AdminDiscountCode.create(discountCode);

    return { discountCode: newDiscountCode };
  } catch (error) {
    throw new Error(`Failed to create discountCode: ${error.message}`);
  }
};

export const updateDiscountCode = async (discountCode: DisCountCodeUpdateType) => {
  const { id, ...rest } = discountCode;
  try {
    if (rest.selected) {
      await AdminDiscountCode.updateMany({ selected: false })
    }
    const updatedDiscountCode = await AdminDiscountCode.findByIdAndUpdate(id, rest, { new: true });

    if (!updatedDiscountCode) {
      throw new Error("Discount Code not found.");
    }

    return { discountCode: updatedDiscountCode };
  } catch (error) {
    throw new Error(`Failed to update discount code: ${error.message}`);
  }
};
export const deleteDiscountCode = async (ids: DisCountCodeDeleteType) => {
  try {
    if (Array.isArray(ids)) {
      const deletedAdminCodes = await AdminDiscountCode.deleteMany({ _id: { $in: ids } });
      if (deletedAdminCodes.deletedCount === 0) {
        throw new Error("No admin codes found to delete.");
      }
      return { message: `${deletedAdminCodes.deletedCount} discountC(s) deleted.` };
    } else {
      const deletedDiscountCode = await AdminDiscountCode.findByIdAndDelete(ids);
      if (!deletedDiscountCode) {
        throw new Error("Discount Code not found.");
      }
      return { message: "Discount Code deleted." };
    }
  } catch (error) {
    throw new Error(`Failed to delete discount code: ${error.message}`);
  }
};
