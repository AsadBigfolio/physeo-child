import Image from 'next/image';
import Link from 'next/link';

export default function PremiumSection() {
    return (
        <div style={{ backgroundImage: 'url(/new/heroSectionBg.png)' }} className=" rounded-[20px] flex items-center">
            <div className='py-[34px] px-[40px] flex flex-col gap-[20px]'>
                <div className='flex flex-col gap-[8px]'>
                    <h1 className='section-heading'>
                        Premium quality content
                    </h1>
                    <p className='muted-description'>Lorem ipsum dolor sit amet consectetur. Faucibus donec at ipsum </p>
                </div>
                <div className='flex gap-[8px]'>
                    <Link className='rounded-full flex gap-[10px] h-[40px] py-[12px] px-[20px] text-mainText hover:shadow-md bg-white font-semibold text-[14px] leading-[16px]' href='/'>
                        <Image src="/social/download.svg" height={16} width={16} alt='download' />
                        Download Brochure
                    </Link>
                    <Link className='rounded-full flex gap-[10px] h-[40px] py-[12px] px-[20px] text-mainText hover:shadow-md bg-white font-semibold text-[14px] leading-[16px]' href='/'>
                        <Image src="/social/monitor.svg" height={16} width={16} alt='download' />
                        Book free meeting
                    </Link>
                </div>
            </div>
        </div>
    );
}