import StudentProvider from "@/providers/StudentProvider";
import { getUserById } from "@/queries/user/getUserById";

const layout = async ({ children, params }) => {
  try {
    return (
      <StudentProvider >
        {children}
      </StudentProvider>
    );
  } catch (err) {
    return <div>Could not fetch student</div>;
  }
};
export default layout;
