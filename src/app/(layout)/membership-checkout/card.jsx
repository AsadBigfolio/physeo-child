import RoundedButton from '@/components/Home/RoundedButton';
import Button from '@/components/UI/Button';
import CheckFilledIcon from '@/svgs/CheckFilledIcon';
import RightArrow from '@/svgs/RightArrow';
import { trpc } from '@/utils/trpcClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PlanCard = ({ plan, index }) => {
    const router = useRouter()
    const [referredBy, setReferredBy] = useState(null);
    const handleButtonClick = () => {
        router.replace('/')
    };
    const { data: selectedDiscount } = trpc.discountCode.selectedDiscount.useQuery()
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

    useEffect(() => {
        setReferredBy(localStorage.getItem("referredBy") ? true : false);
    }, []);
    return (
        <div
            key={index}
            className={`border-[1px] shadow-md border-primary bg-white rounded-[10px] w-full
                px-[20px] flex flex-col justify-between py-[32px] min-h-[467px] md:h-auto ${index === 1 ? 'md:mt-[-120px]' : ''
                } ${index % 2 === 1 ? 'mt-[30px]' : ''}`}
        >
            <div className="mb-[120px] relative md:mb-0">
                <p className="absolute bg-primary text-white text-[12px] font-poppins px-6 py-[6px] rounded-full top-[-50px] left-[40px]">
                    {plan.cardTitle}
                </p>
                <div className={`font-poppins text-display-xxl flex text-primary`}>
                    <p className="text-[32px]">$</p>
                    <span className={`${referredBy ? "line-through" : ""}`}>{plan.isFree ? '0.00' : plan.price}</span>
                </div>
                {referredBy && <div className="font-poppins font-bold flex text-primary text-[36px] md:text-[42px]">
                    <p className="text-[20px]">$</p>
                    {plan.isFree ? '0.00' : afterDiscountAmount(plan.price)}
                </div>}
                <p className="text-gray-500 mb-8 text-sm">{plan.plan}</p>

                <div className="space-y-[10px]">
                    {plan.planFeatures.map((feature, idx) => {
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

            <RoundedButton href="/?#plan" text="Change Plan" />
        </div>
    );
};

export default PlanCard;
