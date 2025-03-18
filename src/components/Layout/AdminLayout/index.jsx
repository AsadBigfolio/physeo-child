"use client";

import { useContext, useState } from "react";
import AdminMenu from "./AdminMenu";
import AdminHeader from "./AdminHeader";
import UserContext from "@/context/user";
import { redirect } from "next/navigation";
// import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(UserContext);
  if (user?.role !== "admin") {
    redirect("/signin");
  }

  return (
    <div className="flex">
      <AdminMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="h-screen overflow-auto w-full">
        <AdminHeader user={user} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
