import AdminLayout from "@/components/Layout/AdminLayout";
import { TooltipProvider } from "@/components/UI/Tooltip";

const layout = ({ children }) => {
  return (
    <TooltipProvider>
      <AdminLayout>{children}</AdminLayout>
    </TooltipProvider>
  );
};
export default layout;
