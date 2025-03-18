"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/InputFields/Textinput";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { trpc } from "@/utils/trpcClient";
import Spinner from "@/components/UI/Spinner";
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Signin from '@/app/(auth)/signin/page';

const ResetPasswordForm = () => {
  const router = useRouter();
  const params = useQueryParams();
  const token = params.get("token");
  const email = params.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [trpcError, setTrpcError] = useState("");

  const handleError = (error) => {
    const formattedErrors = formatErrors(error);
    setTrpcError(formattedErrors);
  };

  const handleResetSuccess = () => {
    setTimeout(() => {
      window.location.href = "/signin";
    }, 1500);
  };

  const { mutate: resetPassword, isPending: changingPassword } =
    trpc.ForgetPassword.resetPassword.useMutation({
      onSuccess: () => {
        handleResetSuccess();
      },
      onError: (error) => {
        handleError(error);
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("Password must be 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    resetPassword({ email, token, password: newPassword });
  };

  useEffect(() => {
    if (!token || !email) {
      router.push("/");
    }
  }, [token, email, router]);

  if (!token || !email) {
    return null;
  }

  return (
    <>
      <Signin />
      <Modal
        open={true}
        className='w-[500px] !rounded-[30px] bg-white'
      >
        <div className="flex justify-center items-center w-full">
          <form onSubmit={handleSubmit} >
            <h1 className="text-[36px] font-bold mb-4">Reset Your Password</h1>
            <TextInput
              label={"Enter New Password"}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              isRequired={true}
            />
            <TextInput
              label={"Re-Type your New Password*"}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              isRequired={true}
            />
            {(error || trpcError) && (
              <p className="text-red-500 text-para-base mt-2">
                {error || trpcError?.user}
              </p>
            )}
            <Button
              type="submit"
              className="w-full py-6"
              loading={changingPassword}
              disabled={changingPassword}
            >
              {changingPassword ? <Spinner color={"white"} /> : "Send"}
            </Button>
          </form>
        </div>
      </Modal></>

  );
};

export default ResetPasswordForm;
