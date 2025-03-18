import Image from "next/image";
import Link from "next/link";
import "./account.css";

const AccountLayout = ({ children }) => {
  const redirectLinks = [
    { label: "Privacy Policy", link: "/privacy-policy" },
    // { label: "Refund Policy", link: "/refund-policy" },
    { label: "Term of Service", link: "/terms-of-service" },
    { label: "FAQ", link: "/faq" },
  ];
  return (
    <div className="flex min-h-screen justify-between bg-authWhite">
      <div className="w-full md:w-[60%] lg:w-[47%] 2xl:w-[50%] ">
        {children}
      </div>
      <div className="hidden md:flex md:w-[40%] lg:w-[47%] 2xl:w-[50%] flex-col signup-background-gradient rounded-bl-[150px] rounded-tl-[12px] max-h-screen sticky top-0">
        <div className="flex-grow flex items-center justify-center">
          <Link
            href="/"
            className="relative h-[87px] 2xl:h-[123px] w-[450px] 2xl:w-[60%]"
          >
            <Image src={"/TSU_LogoOK2.png"} fill={true} alt="Super U Logo" />
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-2 lg:space-x-[30px] 2xl:space-x-[50px] mb-[40px] pl-[40px]">
          {redirectLinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className="text-[10px] lg:text-para-base text-white font-poppins"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
