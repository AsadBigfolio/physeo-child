"use client"
import React, { useContext, useState } from "react";
import OtpModal from "./OtpModal";
import UserContext from "@/context/user";

const OtpContainer = () => {
  const {user} = useContext(UserContext)
  const [otpModal, setOtpModal] = useState(false);
  return (
    <div>
      {!user?.isEmailVerified && (
        <div className="p-2 z-50 w-full bg-red-400 text-mainText font-medium flex gap-3 items-center">
          <p>Your Account is Not Verified</p>
          <button onClick={() => setOtpModal(true)}>Verify Account</button>
        </div>
      )}
      <OtpModal setOtpModal={setOtpModal} otpModal={otpModal} user={user} />
    </div>
  );
};

export default OtpContainer;
