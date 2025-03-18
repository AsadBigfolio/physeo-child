import UserLayout from "@/components/Layout/UserLayout";
export const metadata = {
  title: {
    absolute: '',
    default: '',
    template: '%s | The Supernatural University'
  },
  description: "Super Natural",
};

const layout = ({ children }) => {
  return <UserLayout>{children}</UserLayout>;
};
export default layout;
