import { redirect } from "next/navigation";
// import OtpContainer from "@/components/Otp";
import loadSession from "@/utils/session";


const UserLayout = async ({ children }) => {
  const session = await loadSession()
  const user = session?.user
  const authenticated = !!user;
  return !authenticated ? (
    redirect("/signin")
  ) : (
    <>
        {/* <OtpContainer /> */}
        {children}
    </>
  );
};
export default UserLayout;
