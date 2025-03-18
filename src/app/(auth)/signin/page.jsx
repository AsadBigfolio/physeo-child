"use client";

import AccountLayout from "@/components/AccountLayout";
import Link from "next/link";
import TextInput from "@/components/InputFields/Textinput";
import { FcGoogle } from "react-icons/fc";
import ForgotPasswordScreen from "@/components/ForgotPasswordScreen";
import { useFormState, useFormStatus } from "react-dom";
import login from "@/actions/login";
import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import { trpc } from '@/utils/trpcClient';
import { signIn } from 'next-auth/react';
import Page from '@/components/Common/Page';
import { useSearchParams } from 'next/navigation';

const SubmitButton = ({ isPending }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || isPending}
      loading={pending || isPending}
      type="submit"
      className="w-full py-6 mb-5"
    >
      Sign in
    </Button>
  );
};

const Signin = () => {
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(false);
  const { mutate, data, isPending, error } = trpc.badge.badgeAssignment.useMutation({
    onSuccess: (data) => {
      if (state?.user?.role === 'user') {
        const redirectUrl = decodeURIComponent(
          searchParams.get('redirect') || "/courses"
        );
        window.location.href = redirectUrl;
      } else if (state?.user?.role === 'admin') {
        window.location.href = "/admin";
      }
    }
  });
  const [state, action] = useFormState(login, {
    validationErrors: null,
    ok: false,
    error: null,
  });

  useEffect(() => {
    if (state.ok) {
      const userId = state?.user?.id
      mutate({ userId: userId, isLogin: true })
    }
  }, [state]);


  const findError = (field) => {
    return state.validationErrors?.find((error) => error.field === field)
      ?.message;
  };
  const handleKeyDown = (e) => {
    if (showModal && e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <Page title='Login'>
    <AccountLayout>
      <div className="flex justify-center items-center h-full flex-col">
        <div className="w-full md:min-w-[480px] md:w-1/2 px-[20px] md:px-[50px] pt-[50px] flex-grow flex flex-col justify-center">
          <h1 className="text-[36px] font-bold mb-1 xl:mb-2">
            Sign In Yourself
          </h1>
          <p className="font-poppins text-[13px] 2xl:text-[15px] opacity-60 mb-[30px] xl:mb-[50px]">
            Enter your email and password to sign in!
          </p>
          <button
            type=""
            onClick={() => signIn('google')}
            className="rounded-full text-mainText text-para-base py-[13px] px-[24px] bg-transparent border-[1px] bg-white border-[#0000001A] outline-none font-sans font-medium mb-[25px]"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>
                <FcGoogle size={24} />
              </span>
              <p className='cursor-pointer'> Sign in with Google</p>
            </div>
          </button>
          <div className="w-full flex items-center gap-x-3 mb-[25px]">
            <div className="flex-grow h-[1px] bg-black opacity-25" />
            <p className="font-sans text-[12px] opacity-30">or</p>
            <div className="flex-grow h-[1px] bg-black opacity-25" />
          </div>
          <form action={action} onKeyDown={handleKeyDown}>
            <TextInput
              label={"Email"}
              name={"email"}
              placeholder={"mail@gmail.com"}
              type={"text"}
              inputClasses="focus:border-[gray] transition-all"
              isRequired={true}
              error={findError("email")}
            />
            <TextInput
              label={"Password"}
              name={"password"}
              placeholder={"Enter Password"}
              type={"password"}
              inputClasses="focus:border-[gray] transition-all"
              isRequired={true}
              error={findError("password")}
            />
            <div className="flex justify-end items-center mb-[30px]">
              <ForgotPasswordScreen
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
            {<SubmitButton isPending={isPending} />}
            {state.error && (
              <p className="text-para-base text-center mb-2 font-poppins text-red-500">
                {state.error}
              </p>
            )}
          </form>
          <div className="flex font-poppins text-[12px] xl:text-para-base ">
            <p>Not registered yet?</p>
            <Link href="/signup" className="font-bold text-primary ml-[4px]">
              Create an Account
            </Link>
          </div>
        </div>
        <p className="mb-[35px] text-para-base xl:text-base font-poppins text-[#424242] ">
          <span className='opacity-60'> Copyrights © 2024. Developed by{" "}</span>
          <Link
            className="font-bold text-primary"
            href="https://www.bigfolio.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bigfolio
          </Link>
        </p>
      </div>
    </AccountLayout>
    </Page>
  );
};

export default Signin;
