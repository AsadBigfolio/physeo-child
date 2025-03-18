"use client";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Banner = ({ title }) => {
  const pathname = usePathname();

  const paths = pathname.split("/");

  // const allPaths = paths
  //   .filter((path) => path !== "")
  //   .map((path) =>
  //     path.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  //   );

  const allPaths = paths
    .filter((path) => path !== "")
    .map((path) => {
      return {
        label: path.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        destination: path,
      };
    });

  return (
    <div className="w-full h-[160px] xl:h-[220px] 2xl:h-[300px] flex items-center relative z-[140]">
      <Image src={"/LegalBanner.png"} className='object-cover' fill={true} alt="" />
      <div className="relative z-20 pl-[10%] xl:pl-[15%] 2xl:pl-[20%]">
        <p className="text-display-xxl text-white">{title}</p>
        <div className="flex text-white">
          <Link href="/" className="flex items-center mx-2">
            <FaHome />
          </Link>
          {allPaths.map((path, index) => {
            const isActivated = path.destination === paths[paths.length - 1];
            return (
              <Link
                href={path.destination}
                key={index}
                className="flex gap-2 mr-2"
              >
                <span>{"/"}</span>
                <span className={` ${isActivated && "text-purpleText"}`}>
                  {path.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
