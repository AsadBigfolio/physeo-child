"use client";
import CheckoutForm from "@/components/Payments/Stripe";
import { Course, Plan } from "@/types";
import { trpc } from "@/utils/trpcClient";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import PlanCard from './card';
import UserContext from '@/context/user';
import { useRouter } from 'next/navigation';

const stripeTestPromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Payment() {
  const router = useRouter()
  const [plan, setPlan] = useState<Plan | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[] | []>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const { user } = useContext<any>(UserContext);

  const { data } = trpc.course.get.useQuery();

  useEffect(() => {
    const isAlreadyCourseSubscribe = (corseId: string): boolean => {
      const subscribeCourseIds = user?.subscribedPlans?.map((item: { course: string }) => item.course) || [];
      const remainingCourses = data?.some((item) => subscribeCourseIds.includes(corseId));
      return remainingCourses ?? false
    }
    if (data) setCourses(
      data?.map((item) =>
        !isAlreadyCourseSubscribe(item?._id)
          ? item
          : { ...item, disabled: true }
      )
    );
  }, [data, user]);

  const courseSelectChange = (value) => {
    setSelectedCourses(value);
  };

  useEffect(() => {
    const getPlan = localStorage.getItem("plan");
    if (getPlan) {
      setPlan(JSON.parse(getPlan));
    }
  }, []);

  if (!user) {
    const currentUrl = encodeURIComponent(window.location.href);
    router.push(`/signin?redirect=${currentUrl}`)
    return
  }

  return (
    <div className='bg-white'>
      <div className='max-w-[1320px] px-[20px] mx-auto py-5 md:py-[80px] flex flex-col gap-y-[30px] md:gap-y-12'>
      <h1 className='text-2xl text-center md:text-left md:text-5xl font-bold font-poppins leading-[30.72px] md:leading-[61.44px]'>Payment Details</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[30px] md:gap-x-20' >
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm selectedCourses={selectedCourses} plan={plan} courseSelectChange={courseSelectChange} courses={courses} />
        </Elements>
        <div className='bg-[#F6F0FF] rounded-3xl flex justify-center'>
          <div className='p-5 md:p-14'>
            {plan && <PlanCard plan={plan} index={10} />}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
