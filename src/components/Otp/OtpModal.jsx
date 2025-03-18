"use client";
import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import OtpInput from "react-otp-input";
import { cn } from "@/utils/classNames";
import { trpc } from "@/utils/trpcClient";
import Spinner from "../UI/Spinner";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { useRouter } from "next/navigation";
import Button from '../UI/Button';
import CheckFilledIcon from '@/svgs/CheckFilledIcon';

const OtpModal = ({ setOtpModal, otpModal, user, email, handleRegisterForm }) => {
  const router = useRouter();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVerifyAccount, setIsVerifyAccount] = useState(false);
  const [otp, setOtp] = useState("");
  const [displayVerify, setDisplayVerify] = useState(false);
  const [errors, setErrors] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [resendAvailable, setResendAvailable] = useState(false);

  const handleError = (error) => {
    const formattedErrors = formatErrors(error);
    setErrors(formattedErrors);
  };

  const {
    mutate: sendOtp,
    isPending: sendingOtp,
  } = trpc.otp.addOTPUsingEmail.useMutation({
    onSuccess: () => {
      setCountdown(120);
      setResendAvailable(false);
      setShowOtpInput(true);
    },
    onError: handleError,
  });

  const {
    mutate: verifyOtp,
    isPending: verifyingOtp,
  } = trpc.otp.verifyOtpUsingEmail.useMutation({
    onSuccess: () => {
      setOtpModal(false);
      handleRegisterForm();
      setCountdown(0);
      setShowOtpInput(false);
      setOtp("");
      setErrors(null);
      setIsVerifyAccount(true);
    },
    onError: handleError,
  });

  useEffect(() => {
    if (otp && otp.length === 4) {
      setDisplayVerify(true);
    }
  }, [otp]);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (showOtpInput) {
      setResendAvailable(true);
    }
  }, [countdown, showOtpInput]);

  useEffect(() => {
    if (otpModal) {
      sendOtp({ email });
    }
  }, [otpModal]);

  const handleResendOtpClick = () => {
    setOtp("");
    sendOtp({ email });
  };

  const handleVerifyOtp = () => {
    verifyOtp({ email, otp });
  };

  return (
    <Modal
      className='!w-[500px] h-[355px] px-[45px] !rounded-[30px] bg-white'
      onClose={() => {
        setErrors(null);
        setOtpModal(false);
      }}
      open={otpModal}
    >
      {isVerifyAccount ? (
        <div className="flex w-full justify-center">
          <div className='text-center'>
            <div className='flex justify-center'>
              <CheckFilledIcon width={69} height={69} />
            </div>
            <p className='font-[700] mt-4 text-[32px]'>Your Account is Verified</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-mainText text-[32px] mt-[-25px] font-[700] font-poppins">Enter Code</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="w-[24px]" />}
            renderInput={(props) => (
              <input
                {...props}
                className="min-w-[84px] mt-7 focus:border-[#491A8B] transition-all aspect-square text-mainText rounded-full text-heading-md outline-none border-[1px] border-[#DDDDDD]"
                placeholder="X"
              />
            )}
          />
          {errors && (
            <p className="text-subtitle-md text-red-500 mt-1 ml-3">
              {errors?.otp}
            </p>
          )}
          <div className="w-full flex justify-end gap-3 mt-5">
            <Button
              className={cn(
                'w-full py-6',
                displayVerify ? "" : "opacity-40 cursor-not-allowed"
              )}
              disabled={!displayVerify || verifyingOtp}
              onClick={handleVerifyOtp}
            >
              {verifyingOtp ? <Spinner color={"white"} /> : "Send"}
            </Button>
            {resendAvailable && (
              <button
                onClick={handleResendOtpClick}
                className="py-2 px-4 text-primary underline"
              >
                Resend OTP
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {countdown > 0
                ? `You can resend OTP in ${Math.floor(countdown / 60)}:${countdown % 60} minutes`
              : "You can now resend OTP."}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default OtpModal;
