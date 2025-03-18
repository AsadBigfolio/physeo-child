import AdminDiscountCode from '@/models/DiscountCode';

export const getDiscountCodes = async (page = 1, pageSize = 10, searchQuery = "") => {
    try {
        const query: any = {};
        const searchParams = new URLSearchParams(searchQuery);
        for (const [key, value] of searchParams.entries()) {
            if (key !== "search") {
                query[key.toLowerCase()] = { $regex: value, $options: "i" };
            } else {
                query.discountCode = { $regex: value, $options: "i" };
            }
        }
        const skip = (page - 1) * pageSize;
        const discountCodes = await AdminDiscountCode.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        const totalDiscountCodes = await AdminDiscountCode.countDocuments(query);

        if (!discountCodes.length) {
            return { discountCodes: [] };
        }

        return {
            discountCodes,
            totalDiscountCodes,
            totalPages: Math.ceil(totalDiscountCodes / pageSize),
            currentPage: page,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};