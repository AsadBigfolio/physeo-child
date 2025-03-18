"use client";
import { useMemo, useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import TextInput from "@/components/InputFields/Textinput";
import ConsentCheckboxInput from "@/components/InputFields/ConsentCheckbox";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import OtpModal from '@/components/Otp/OtpModal';
import { registerSchema } from '@/validations/userSchema';
import login from '@/actions/login';

const Signup = () => {
  const [otpModal, setOtpModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const { mutate, isPending, error } = trpc.user.register.useMutation({
    onSuccess: async () => {
      try {
        setLoginLoading(true);

        const res = await login(null, {
          email: formData.email,
          password: formData.password
        }, true);

        if (res?.ok) {
          window.location.href = "/courses";
        } else {
          console.error("Login failed after registration:", res?.error || "Unknown error");
        }
      } catch (err) {
        console.error("Login after registration failed", err);
      } finally {
        // Reset loading state
        setLoginLoading(false);
      }
    },
  });

  const { mutateAsync: checkUserName, isPending: checkUserNameLoading, error: checkUserNameError } = trpc.user.userNameAlreadyExists.useMutation();

  const formattedErrors = useMemo(() => {
    return (
      safeJSONParse(error?.message ?? checkUserNameError?.message)?.reduce((acc, error) => {
        acc[error.path.join("_")] = error.message;
        return acc;
      }, {}) || {}
    );
  }, [error, checkUserNameError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, consent: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    let userNameAlreadyExists = false;
    try {
      await checkUserName({ userName: formData?.userName }, {
        onError: () => {
          userNameAlreadyExists = true;
        }
      });
    } catch (error) {
      console.log(error);
    }

    if (userNameAlreadyExists) {
      return;
    }

    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});

      setFormErrors(errors);
    } else {
      setOtpModal(true);
    }
  };

  return (
    <AccountLayout>
      <div className="px-[20px] md:pl-[30px] lg:pl-[50px] xl:pl-[100px] 2xl:pl-[230px] pt-[50px] lg:pt-[80px] h-full">
        <div className="w-full md:w-[95%] 2xl:w-[50%] 2xl:min-w-[480px] h-full flex flex-col justify-center">
          <h1 className="text-[36px] font-bold mb-1 xl:mb-2">
            Register Yourself
          </h1>
          <p className="font-poppins text-[13px] 2xl:text-[15px] opacity-60 mb-[50px] md:mb-[30px] xl:mb-[50px]">
            Enter your details to proceed!
          </p>
          <OtpModal otpModal={otpModal} email={formData?.email ?? ''} handleRegisterForm={() => mutate(formData)} setOtpModal={setOtpModal} />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-4">
              <TextInput
                label={"First Name"}
                name={"firstName"}
                placeholder={"John"}
                type={"text"}
                isRequired={true}
                error={formErrors.firstName || formattedErrors.firstName}
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextInput
                label={"Last Name"}
                name={"lastName"}
                placeholder={"Doe"}
                type={"text"}
                isRequired={true}
                error={formErrors.lastName || formattedErrors.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <TextInput
              label={"Username"}
              name={"userName"}
              placeholder={"John Doe"}
              type={"text"}
              isRequired={true}
              error={formErrors.userName || formattedErrors.userName}
              value={formData.userName}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <TextInput
                label={"Phone Number"}
                name={"phoneNumber"}
                placeholder={"+1 233 2334 2332"}
                type={"text"}
                isRequired={true}
                error={formErrors.phoneNumber || formattedErrors.phoneNumber}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <TextInput
                label={"Email"}
                name={"email"}
                placeholder={"mail@gmail.com"}
                type={"email"}
                isRequired={true}
                error={formErrors.email || formattedErrors.email}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <TextInput
              label={"Password"}
              name={"password"}
              placeholder={"Enter Password"}
              type={"password"}
              isRequired={true}
              error={formErrors.password || formattedErrors.password}
              value={formData.password}
              onChange={handleChange}
            />
            <TextInput
              label={"Re-Type Password"}
              name={"confirmPassword"}
              placeholder={"Re-Type Password"}
              type={"password"}
              isRequired={true}
              error={formErrors.confirmPassword || formattedErrors.confirmPassword}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <ConsentCheckboxInput
              value={formData.consent}
              onChange={handleCheckboxChange}
              name={"consent"}
              error={formErrors.consent || formattedErrors.consent_consent}
            />
            <Button
              disabled={isPending || checkUserNameLoading || loginLoading}
              loading={isPending || checkUserNameLoading || loginLoading}
              type="submit"
              className="w-full py-6 mb-5"
            >
              Sign up
            </Button>
          </form>
          <div className="flex justify-center md:justify-start font-poppins text-[12px] xl:text-para-base md:mb-[90px]">
            <p>Already have an account?</p>
            <Link href="/signin" className="font-bold text-primary ml-[4px]">
              Sign in
            </Link>
          </div>
          <div className="flex grow mb-[35px] items-end justify-center">
            <p className="text-para-base xl:text-base font-poppins text-[#424242]">
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
        </div>
      </div>
    </AccountLayout>
  );
};

export default Signup;
