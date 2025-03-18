"use client";

import React, { useState } from "react";
import UserContext from "../context/user";

export const AuthContextRef = React.createRef();

const UserProvider = ({ children, defaultUser = null, ...props }) => {
  const [user, setUser] = useState(defaultUser);

  const updateUser = (data) => {
    const old = user ? user : {};
    let newData = { ...old, ...data };
    setUser(newData);
  };

  const contextValue = {
    ...props,
    user,
    setUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
