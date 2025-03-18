import AdminDiscountCode from '@/models/DiscountCode';

export const selectDiscountCode = async (id: string) => {
    try {
        await AdminDiscountCode.updateMany({ selected: false })
        const discountCode = await AdminDiscountCode.findByIdAndUpdate(id, { selected: true }, { new: true })
        return { discountCode, message: "Discount Code selected." };
    } catch (error) {
        throw new Error(`Failed to get discountCode: ${error.message}`);
    }
}