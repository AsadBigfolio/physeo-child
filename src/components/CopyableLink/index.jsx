"use client"
import { useContext, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import UserContext from '@/context/user';
import Button from '../UI/Button';
import { trpc } from '@/utils/trpcClient';
import { toast } from 'sonner';

export default function CopyableLink() {
    const { user } = useContext(UserContext);
    const { mutate: generateReferral, isPending } = trpc.referralCode.createReferralCode.useMutation({
        onSuccess: () => {
            toast.success("Referral code generated successfully!");
            window.location.href = "/profile";
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const { role } = user
    const link = `https://thesupernaturaluniversity.com/?referredBy=${user?.referralCode}#plan`;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    if (role !== "influencer" && role) {
        return null
    }
    return (
        <div>
            {user?.referralCode && <div className="text-3xl text-primary mb-3 ">
                Referral URL
            </div>}
            {user?.referralCode ? <div className="flex items-center gap-2 bg-[#A197EC52] p-3 rounded-lg border border-gray-300 w-fit">
                <p
                    className="text-primary font-medium underline max-w-fit hover:text-blue-600"
                >
                    {link}
                </p>
                <button
                    onClick={copyToClipboard}
                    className="p-2 rounded bg-white hover:bg-gray-200 transition-all"
                >
                    <FaRegCopy size={18} className="text-gray-600" />
                </button>
                {copied && <span className="text-green-600 text-sm">Copied!</span>}
            </div> : <Button loading={isPending} onClick={() => generateReferral({ userId: user?._id })} className='w-fit'>Generate Referral Code</Button>}
        </div>
    );
}
