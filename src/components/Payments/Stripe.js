"use client";

import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { trpc } from "@/utils/trpcClient";
import UserContext from "@/context/user";
import TextInput from '../InputFields/Textinput';
import Button from "../UI/Button";
import CheckboxInput from '../InputFields/ChecboxField';
import Link from 'next/link';
import { MultiSelect } from '../InputFields/MultiSelect';
import { toast } from 'sonner';

export default function Stripe({ plan, selectedCourses, courses, courseSelectChange }) {
  const { user } = useContext(UserContext);
  const [agree, setAgree] = useState(false);
  const [referredBy, setReferredBy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const stripe = useStripe();
  const elements = useElements();
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    setReferredBy(localStorage.getItem("referredBy") ? true : false);
  }, []);

  const createPaymentIntent = trpc.stripe.createPaymentIntent.useMutation({
    onError: (error) => {
      toast.error(error.message)
    }
  });
  const processReferralDiscount = trpc.stripe.processReferralDiscount.useMutation({
    onError: (error) => {
      toast.error(error.message)
    }
  });
  const { data: selectedDiscount } = trpc.discountCode.selectedDiscount.useQuery()
  const createOrder = trpc.stripe.createOrder.useMutation({
    onSuccess: () => {
      toast.success('Plan subscribed successfully.')
      localStorage.removeItem("referredBy")
      window.location.href = "/"
    },
  });

  const afterDiscountAmount = (amount) => {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      console.error("Invalid amount:", amount);
      return 0;
    }
    if (selectedDiscount?.success && referredBy) {
      const discountedAmount = numAmount - ((Number(selectedDiscount?.selectedDiscount?.percentage) * numAmount) / 100);
      return parseFloat(discountedAmount.toFixed(2));
    }
    return parseFloat(numAmount.toFixed(2));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setLoading(true);
    const isReferredBy = localStorage.getItem("referredBy") 
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card Element not found");
      }
      const amount = plan.title === "🏢 PREMIUM PLAN" ? plan.price : String(plan.price * selectedCourses.length);
      const paymentData = {
        amount: String(amount),
        plan: plan.title,
        ...(referredBy && { userName: isReferredBy })
      };
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { email },
      });

      if (paymentMethodError) {
        if (paymentMethodError.code === "expired_card") {
          toast.error("Your card has expired. Please use a valid card.");
        }

        setLoading(false);
        return;
      }

      const data = await createPaymentIntent.mutateAsync(paymentData);

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(data, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        throw confirmError;
      }
      if (isReferredBy) {
        const res = await processReferralDiscount.mutateAsync({
          amount: amount,
          plan: plan.title,
          userName: isReferredBy
        })
      }
      await createOrder.mutateAsync({
        userId: user?._id,
        plan: plan._id,
        paymentMethod: "Stripe",
        paymentId: paymentIntent.id,
        ...(plan.title === "🚀  STANDARD PLAN" && { courses: selectedCourses?.map((item) => item?._id) }),
      });
      setLoading(false);
    } catch (error) {
      console.error("Payment failed:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col mt-2 font-poppins">
        {plan?.title === "🚀  STANDARD PLAN" && (
          <div className='md:mt-[30px]'>
            <MultiSelect
              label={"Select Courses"}
              name={"selectedCourses"}
              placeholder={"Select Courses"}
              onChange={(e) => courseSelectChange(e)}
              options={courses}
            />
          </div>
        )}
        {isLoggedIn && (
          <TextInput
            label='Email Address'
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggedIn}
          />
        )}
        <div className="mt-4">
          <p
            className={`text-[14px] xl:text-para-base font-poppins mb-2 xl:mb-[13px]`}
          >
            Credit Card Number
          </p>
          <CardElement
            options={{ hidePostalCode: true }}
            className="border-[#b6b9bf] bg-[#E5E7EB] rounded-full disabled:cursor-not-allowed disabled:bg-[#F2F2F2] disabled: text-mainText text-[12px] xl:text-para-base py-[10px] xl:py-[15px] px-[16px] xl:px-[24px] bg-transparent border-[1px] border-[#0000001A] outline-none"
          />
        </div>
        {/* <div
          className='mt-4 flex'
        >
          <CheckboxInput
            onChange={(e) => console.log(e)}
          />
          <p>I’ve a promo code</p>
        </div> */}
        <div
          className='mt-4 flex'
        >
          <CheckboxInput
            onChange={(e) => setAgree(e)}
            value={agree}
          />
          <p>I agree to the <Link href={'/terms-of-service'} className='underline text-[#8350DF]'>Term of Service</Link></p>
        </div>
        <div className='h-[1px] bg-[#b6b9bf] mt-12' />
        <div className='flex justify-between mt-2'>
          <p>Total Amount</p>
          <p className='font-bold'>${plan?.title === "🏢 PREMIUM PLAN"
            ? afterDiscountAmount(plan?.price) ?? ""
            : afterDiscountAmount(selectedCourses?.length * Number(plan?.price))}</p>
        </div>
        <Button
          className='py-6 my-6'
          onClick={handleSubmit}
          disabled={
            plan?.title === "🏢 PREMIUM PLAN"
              ? !agree
              : !agree || !selectedCourses || !selectedCourses?.length
          }
          loading={loading}
        >
          Pay Now
        </Button>
      </div>
    </>
  );
}
