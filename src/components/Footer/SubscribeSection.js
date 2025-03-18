'use client'
import { useState } from "react";
import SendIcon from '@/svgs/SendIcon';
import { trpc } from '@/utils/trpcClient';
import { toast } from "sonner";
import Spinner from '../UI/Spinner';
import Link from 'next/link';

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const createEmailUserMutation = trpc.newsLetter.createEmailUser.useMutation({
    onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    }
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await createEmailUserMutation.mutateAsync({ email });
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <div className="md:bg-[#141414] w-full relative rounded-[20px] overflow-hidden mb-6">
      <div className="w-full text-white md:px-[80px] md:py-[51px] relative z-20">
        <p className="text-heading-xl text-center md:text-left mb-2 md:mb-4">
          Subscribe to our <br /><span className="text-primary">Newsletter</span>
        </p>
        <p className="leading-8 font-poppins mb-4 text-subtitle-md">
          Sign up for our exclusive updates and be the first to know about our<br />
          special offers and <span style={{ wordWrap: 'break-word' }} className="font-poppinsBold font-bold underline cursor-pointer">
            <Link href="http://supernaturalcon.com/" target='_blank'>
              SupernaturalCon
            </Link>
          </span>{" "} events.
        </p>
        <form onSubmit={handleSubscribe} className="w-full max-w-[500px]">
          <span className="flex items-center justify-between border-[1px] border-primary bg-white pl-[20px] md:pr-[6px] h-[41px] md:h-14 rounded-[100px] text-white">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="text-para-lg font-poppins outline-none text-mainText w-full"
              required
            />
            <button type="submit" aria-label="Subscribe">
              {!createEmailUserMutation.isPending && <SendIcon />}
              {createEmailUserMutation.isPending && <div className='mx-3'><Spinner color='#491a8b' /></div>}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SubscribeSection;
