"use client";

import { useContext, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import UserContext from "@/context/user";
import Link from "next/link.js";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import MenuBar from "./MenuBar.jsx";
import Drawer from "../Drawer/index.jsx";
import RoundedButton from "../Home/RoundedButton/index.jsx";

const Header = () => {
  const pathName = usePathname();
  const { user } = useContext(UserContext);
  const headerItems = [
    { displayName: "Home", link: "/" },
    { displayName: "Courses", link: "/courses" },
    { displayName: "Blogs", link: "/blog" },
    { displayName: "Our Team", link: "/our-team" },
  ];

  const mobileHeaderItems = [{ displayName: "Sign in", link: "/signin" }];
  const authenticated = !!user;

  const AuthenticatedProfileState = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
      signOut();
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative h-auto">
        <div
          className="flex items-center gap-1 lg:gap-4 bg-primary rounded-full p-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src={user?.image || "/DummyProfilePic.jpg"}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex items-center px-3 gap-2">
            <p className="text-white text-para-lg">Profile</p>
            <span className="text-white text-para-lg">
              <FaAngleDown />
            </span>
          </div>
        </div>

        <div
          className={`absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg z-[150] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
            }`}
          style={{ transformOrigin: "top" }}
        >
          <Link
            href="/profile"
            className="block w-full px-4 py-2 transition-all text-black hover:bg-primary-light"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left transition-all text-black hover:bg-primary-light"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  };

  const HamBurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
      signOut();
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="lg:hidden min-w-max">
        <span className="text-para-base" onClick={toggleDropdown}>
          <IoIosMenu size={32} />
        </span>
        <MenuBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          authenticated={authenticated}
          headerItems={headerItems}
          mobileHeaderItems={mobileHeaderItems}
          handleLogout={handleLogout}
        />
      </div>
    );
  };

  return (
    <>
      <header className="w-full flex space-x-2 items-center justify-between h-[50px] lg:h-[100px] max-w-[1320px] px-[20px] mx-auto">
        {/* Show HamBurgerMenu on screens below 900px */}
        <HamBurgerMenu />

        <Link href="/">
          <img
            src={"/TSU_LogoOK2.png"}
            className="filter invert w-[150px] lg:w-[225px] h-auto object-contain"
            alt="Super U Logo"
          />
        </Link>

        <span className="lg:hidden text-para-base">
          <Drawer />
        </span>

        {/* Show the full menu on screens above 900px */}
        <div className="hidden lg:flex w-[355px] lg:w-[423px] justify-between text-subtitle-md">
          {headerItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={`${pathName === item.link && "text-primary underline font-bold"
                }`}
            >
              {item.displayName}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex gap-5 items-center">
          {authenticated ? (
            <div className="flex items-center gap-1 lg:gap-3 2xl:gap-5">
              <div className="flex gap-2 lg:gap-4 2xl:gap-6">
                <span className="text-para-base lg:text-subtitle-md lg:2xl:text-[24px]">
                  <Drawer />
                </span>
              </div>
              <AuthenticatedProfileState />
            </div>
          ) : (
              <div className="flex items-center justify-between gap-[20px]">
                <div className="flex gap-[20px]">
                  <span className="text-para-base lg:text-subtitle-md 2xl:text-[24px]">
                    <Drawer />
                  </span>
                  <Link href="/signin" className="text-subtitle-md underline">
                    Login
                  </Link>
                </div>
                <RoundedButton href="/signup" text="Join for Free" />
              </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
