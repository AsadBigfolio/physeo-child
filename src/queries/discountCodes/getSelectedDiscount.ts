import AdminDiscountCode from '@/models/DiscountCode';

export const selectedDiscount = async () => {
    try {
        const selectedDiscount = await AdminDiscountCode.findOne({ selected: true })
        return { selectedDiscount, success: true };
    } catch (error) {
        throw new Error(`Failed to get selectedDiscount: ${error.message}`);
    }
}