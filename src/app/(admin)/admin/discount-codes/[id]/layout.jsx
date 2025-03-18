import AdminDiscountCodeProvider from '@/providers/DiscountCodeProvider';
import { getDiscountById } from '@/queries/discountCodes/getDiscountById';

const layout = async ({ children, params: { id } }) => {
  const data = await getDiscountById(id);
  const discountCode = JSON.parse(data);
  return <AdminDiscountCodeProvider defaultState={discountCode} >{children}</AdminDiscountCodeProvider>;
};
export default layout;
