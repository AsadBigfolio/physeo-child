import Link from "next/link";

const AdminHeader = ({ user }) => {
  return (
    <div className="bg-white h-[77px] w-full flex px-5 justify-end items-center border-b border-gray-200 shadow-sm">
      <Link href={"/profile"}>
        <img
          src={user?.image || "/DummyProfilePic.jpg"}
          alt="logo"
          className="h-[50px] w-[50px] rounded-full float-left"
        />
      </Link>
    </div>
  );
};
export default AdminHeader;
