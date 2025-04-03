"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserContext from "@/context/user";
import { signOut } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";
import Drawer from "../Drawer/index.jsx";
import CountdownBanner from '../Banner/index.jsx';
import MenuBar from './MenuBar.jsx';
import { FaAngleDown } from 'react-icons/fa';
import PrimaryLink from '../PrimaryLink/index.jsx';

const Header = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const headerItems = [
    { displayName: "Home", link: "/" },
    { displayName: "Courses", link: "/courses" },
    { displayName: "Dashboard", link: "/dashboard" },
    { displayName: "Story", link: "/story" },
    { displayName: "Contact", link: "/contact" },
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
      <CountdownBanner />
      <header className="w-full bg-white">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between h-[64px] px-6">
          <button className="lg:hidden text-gray-700 text-2xl" onClick={() => setIsOpen(true)}>
            <IoIosMenu />
          </button>

          <Link href="/" className="flex items-center space-x-2">
            <img src={"/new/Logo.jpg"} alt="Physeo Logo" className="w-[147px] h-[36px]" />
          </Link>

          <nav className="hidden lg:flex space-x-6 text-gray-700 text-sm font-medium ">
            {headerItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`hover:text-blue-600 text-[16px] font-semibold transition leading-[20px] text-[#303030] ${pathName === item.link ? "!text-blue-600" : ""
                  }`}
              >
                {item.displayName}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Drawer />

            {/* Login & Sign-up Buttons */}
            {!authenticated && <div className="hidden lg:flex space-x-3">
              <Link
                href="/signin"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium"
              >
                Login
              </Link>
              <PrimaryLink
                title="Join for Free"
                href="/signup"
              />
            </div>}
            {authenticated && <AuthenticatedProfileState />}

            {/* Mobile Drawer Button */}
            <span className="lg:hidden">
              <Drawer />
            </span>
          </div>
        </div>

        {/* Mobile Drawer Component */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="bg-white w-64 p-6 shadow-lg">
              <button className="text-gray-700 text-xl" onClick={() => setIsOpen(false)}>
                ✕
              </button>
              <nav className="mt-6 space-y-4 text-gray-700 text-sm font-medium">
                {headerItems.map((item, index) => (
                  <Link key={index} href={item.link} className="block hover:text-blue-600">
                    {item.displayName}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 space-y-3">
                <Link href="/login" className="block text-blue-600 font-medium">
                  Login
                </Link>
                <Link href="/signup" className="block bg-blue-600 text-white text-center py-2 rounded">
                  Join for Free
                </Link>
              </div>
            </div>
          </div>
        )}

      </header>
    </>
  );
};

export default Header;
