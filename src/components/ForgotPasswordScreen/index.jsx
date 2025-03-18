"use client";

import { useState } from "react";
import TextInput from "@/components/InputFields/Textinput";
import { trpc } from "@/utils/trpcClient";
import Spinner from "../UI/Spinner";
import { formatErrors } from "@/utils/formatTRPCErrors";
import Button from '../UI/Button';
import CheckFilledIcon from '@/svgs/CheckFilledIcon';

const ForgotPasswordScreen = ({ showModal, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleError = (error) => {
    const formattedErrors = formatErrors(error);
    setErrors(formattedErrors);
  };

  const { mutate: sendLink, isPending: sendingLink } =
    trpc.ForgetPassword.sendResetLink.useMutation({
      onSuccess: () => {
        setDisplayMessage(true);
      },
      onError: (error) => {
        handleError(error);
      },
    });

  const sendEmailHandler = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    sendLink({ email });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendEmailHandler();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="text-para-base font-poppins outline-none text-primary"
        onClick={() => setShowModal(true)}
      >
        Forgot Password?
      </button>
      <div
        className={`transition-all fixed h-screen w-screen inset-0 z-40 flex items-center justify-center ${
          showModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="bg-black absolute inset-0 h-full w-full z-40 opacity-50"
          onClick={() => setShowModal(false)}
        />
        <div className="relative z-50 bg-white py-[30px] px-[30px] md:px-[45px] rounded-[30px] min-w-[388px] mx-[20px]">
          {displayMessage ? (
            <div className="flex w-full  justify-center">
              <div className='text-center'>
                <div className='flex justify-center'>
                  <CheckFilledIcon width={69} height={69} />
                </div>
                <p className='font-[700] mt-4 text-[28px]'>Reset Link has been sent<br />
                  to your email!</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-title-xl md:text-heading-lg font-syne font-bold mb-[30px] px-[10px] text-center">
                Reset your Password?
              </h2>
              <TextInput
                label={"Email"}
                type={"text"}
                placeholder={"mail@gmail.com"}
                isRequired={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
              />
              {(emailError || errors) && (
                <p className="text-red-500 text-para-base mt-2">
                  {emailError || errors?.user}
                </p>
              )}
                <Button
                  type="button"
                  className="w-full py-6 mb-5"
                onClick={sendEmailHandler}
                disabled={sendingLink}
              >
                {sendingLink ? <Spinner color={"white"} /> : "Reset Password"}
                </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
