import RightArrow from '@/svgs/RightArrow';
import RightArrowWhite from '@/svgs/RightArrowWhite';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const RoundedButton = ({ href, text, className = '', secondary = false, onClick }) => {
    const secondaryClasses = 'border-[#491A8B] border-[1px] text-primary'
    const primaryClasses = 'bg-primary text-white'
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center justify-between px-[5px] md:px-2 gap-1  overflow-hidden 
                  lg:pr-[6px] h-9 md:h-[55px] rounded-[100px] 
                  text-[12px] md:text-base ${className} w-max  ${secondary ? secondaryClasses : primaryClasses}`}
        >
            <p className="pl-1 font-poppins text-[16px] md:font-[600]">{text}</p>
            <span
                className={`h-[28px] w-[28px] md:h-[45px] md:w-[45px] flex items-center ml-2 justify-center rounded-full ${secondary ? 'bg-primary' : 'bg-white'}`}
            >
                {secondary && <div>
                    <div className="block 2xl:hidden">
                        <RightArrowWhite width={15} height={20} />
                    </div>
                    <div className="hidden 2xl:block">
                        <RightArrowWhite width={24} height={19} />
                    </div>
                </div>}
                {!secondary && <div>
                    <div className="hidden 2xl:block">
                        <RightArrow width={24} height={19} />
                    </div>
                    <div className="block 2xl:hidden">
                        <RightArrow width={15} height={20} />
                    </div>
                </div>}
            </span>
        </Link>
    );
};

export default RoundedButton;
