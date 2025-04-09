import "./globals.css";
import TRPCProvider from "@/providers/TRPCProvider";
import loadSession from "@/utils/session";
import UserProvider from "@/providers/UserProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster, type ToasterProps } from "sonner";
import toast, { Toaster as HotToaster } from "react-hot-toast";
import { Metadata } from "next";
import { getUserProfileData } from "@/queries/user/getUserProfileData";
//test deployment
export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "",
    template: "%s | The Supernatural University",
  },
  description: "Super Natural",
};

const toastProps: ToasterProps = {
  position: "bottom-center",
  toastOptions: {
    classNames: {
      icon: "text-primary",
      title: "text-primary text-[15px]",
    },
  },
};

export default async function RootLayout({ children }) {
  const session = await loadSession();
  const user = session?.user;

  let userData: any;
  if (user) {
    userData = await getUserProfileData(user);
    userData = userData ? JSON.parse(JSON.stringify(userData)) : {};
  }
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.webp" sizes="any" />
      <body>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <Toaster {...toastProps} />
        <HotToaster />
        <UserProvider defaultUser={userData?.user as any} userData={userData}>
          <TRPCProvider>{children}</TRPCProvider>
        </UserProvider>
      </body>
    </html>
  );
}
