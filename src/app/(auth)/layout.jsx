"use client";

import UserContext from "@/context/user";
import { redirect } from "next/navigation";
import { useContext } from "react";

const AuthLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  const authenticated = !!user;
  return authenticated ? redirect("/courses") : children;
};
export default AuthLayout;
