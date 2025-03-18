"use client";

import React, { useState, createContext, useContext } from "react";

const AdminDiscountCodeContext = createContext({});

const initialDiscountState = {
  percentage: 0,
  discountCode: "",
  selected: false,
};

const AdminDiscountCodeProvider = ({ children, defaultState = initialDiscountState }) => {
  const [discountCodeData, setDiscountCodeData] = useState(defaultState);

  const updateDiscountCode = (data) => {
    setDiscountCodeData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const resetDiscountCode = () => {
    setDiscountCodeData(initialDiscountState);
  };

  const contextValue = {
    discountCodeData,
    setDiscountCodeData,
    updateDiscountCode,
    resetDiscountCode,
  };

  return (
    <AdminDiscountCodeContext.Provider value={contextValue}>
      {children}
    </AdminDiscountCodeContext.Provider>
  );
};

export const useAdminDiscountCodeStore = () => {
  const context = useContext(AdminDiscountCodeContext);
  if (!context) {
    throw new Error(
      "useAdminDiscountCodeStore must be used within an AdminDiscountCodeProvider"
    );
  }
  return context;
};

export default AdminDiscountCodeProvider;
