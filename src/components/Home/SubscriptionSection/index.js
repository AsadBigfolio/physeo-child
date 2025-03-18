"use client";
import CheckFilledIcon from "@/svgs/CheckFilledIcon";
import { trpc } from "@/utils/trpcClient";
import { useEffect, useState } from "react";
import RoundedButton from '../RoundedButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SubscriptionSection = () => {
  const searchParams = useSearchParams()
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [referredBy, setReferredBy] = useState(null);
  const { data } = trpc.plan.get.useQuery();
  const { data: selectedDiscount } = trpc.discountCode.selectedDiscount.useQuery()

  useEffect(() => {
    if (data) setSubscriptionData(data);
  }, [data]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [searchParams]);
  subscriptionData.sort((a, b) => {
    const priceA = a.isFree ? 0 : parseFloat(a.price);
    const priceB = b.isFree ? 0 : parseFloat(b.price);
    return priceA - priceB;
  });
  useEffect(() => {
    const referredBy = searchParams.get("referredBy")
    if (referredBy) {
      localStorage.setItem("referredBy", referredBy)
    } else {
      localStorage.removeItem("referredBy")
    }
    setReferredBy(referredBy ? true : false);
  }, []);

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

  return (
    <div className="w-full">
      <h2 className="text-center text-heading-xl mb-12">
        Our <span className="text-primary">Pricing</span>
      </h2>

      <div className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 xl:grid-cols-3 md:gap-x-[50px] justify-center">
        {subscriptionData.sort((a, b) => a.price - b.price).map((subscription, index) => (
          <div
            key={index}
            id={`${!subscription.isFree ? "plan" : "free-plan"}`}
            className={`border-[1px] ${index === 1 ? 'shadow-md border-primary' : ''} 
                bg-white rounded-[10px] w-full
                px-[20px] flex flex-col justify-between my-[32px] min-h-[467px] md:h-auto`}
          >
            <div className="relative">
              <span
                className={`absolute top-[-15px] left-5 px-[24px] py-[6px] 
                    text-white text-xs font-medium  rounded-full bg-primary`}
              >
                {subscription.cardTitle}
              </span>

              <p className="text-primary text-display-xxl !font-poppins mt-12">
                <span className="text-[32px] absolute">$</span>
                <span className={`ml-5 ${referredBy && !subscription.isFree ? "line-through" : ""}`}>
                  {subscription.isFree ? '0.00' : subscription.price}
                </span>
              </p>
              {referredBy && !subscription.isFree && <div className="font-poppins font-bold flex text-primary text-[36px] md:text-[42px]">
                <p className="text-[20px]">$</p>
                {subscription.isFree ? '0.00' : afterDiscountAmount(subscription.price)}
              </div>}
              <p className="text-gray-500 mb-8 text-para-base">{subscription.plan}</p>
              <div className="space-y-[10px]">
                {subscription.planFeatures.map((feature, idx) => {
                  const linkText = "SupernaturalCon®";
                  const reText = "Universe®";
                  const linkIndex = feature.indexOf(linkText);
                  const reIndex = feature.indexOf(reText);

                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckFilledIcon className="mt-1" />
                      <p className="text-gray-800 text-subtitle-md flex-1">
                        {linkIndex !== -1 || reIndex !== -1 ? (
                          <p>
                            {feature.slice(0, Math.min(linkIndex !== -1 ? linkIndex : feature.length, reIndex !== -1 ? reIndex : feature.length))}

                            {linkIndex !== -1 && (
                              <Link href="https://www.supernaturalcon.com/" className="underline" target="_blank">
                                SupernaturalCon<sup>®</sup>
                              </Link>
                            )}

                            {reIndex !== -1 && linkIndex !== -1 && reIndex > linkIndex + linkText.length
                              ? feature.slice(linkIndex + linkText.length, reIndex)
                              : linkIndex === -1
                                ? feature.slice(0, reIndex)
                                : ''
                            }

                            {reIndex !== -1 && (
                              <p>
                                Universe<sup>®.</sup>
                              </p>
                            )}

                            {feature.slice(Math.max(
                              linkIndex !== -1 ? linkIndex + linkText.length : 0,
                              reIndex !== -1 ? reIndex + reText.length : 0
                            ))}
                          </p>
                        ) : (
                          feature
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${'md:pt-[107px]'}`}>
              <RoundedButton
                href={subscription.isFree ? '/signin' : '/membership-checkout'}
                text={subscription.linkText}
                className="md:!w-full mb-3 py-5"
                secondary={index !== 1}
                onClick={() => {
                  localStorage.setItem('plan', JSON.stringify(subscription));
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SubscriptionSection;
