import AdminDiscountCode from '@/models/DiscountCode';

export const getDiscountById = async (id: string) => {
    try {
        const discountCode = await AdminDiscountCode.findById(id).lean();
        if (!discountCode) {
            throw new Error("Discount Code not found.");
        }
        return JSON.stringify(discountCode);
    } catch (error) {
        throw new Error(`Failed to get blog by id: ${error.message}`);
    }
};