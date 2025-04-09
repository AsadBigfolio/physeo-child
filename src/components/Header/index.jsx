"use client";

import { Suspense, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserContext from "@/context/user";
import { signOut } from "next-auth/react";
import { IoIosMenu } from "react-icons/io";
import CountdownBanner from '../Banner/index.jsx';
import PrimaryLink from '../PrimaryLink/index.jsx';
import Image from 'next/image.js';
import { FiUser, FiLogOut } from "react-icons/fi";
import dynamic from 'next/dynamic.js';
import { FaSearch } from 'react-icons/fa';

const Drawer = dynamic(() => import("../Drawer/index.jsx"), {
  ssr: false
});

const AuthenticatedProfileState = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={toggleDropdown}
        aria-label="Profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={user?.image ?? "/DummyProfilePic.jpg"}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full object-contain h-[40px] border-2 border-gray-200 transition-colors duration-200"
          priority
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-[12px] shadow-lg z-[999] transition-all duration-200 ease-out ${isOpen
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
        role="menu"
      >
        <div className="py-2 px-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md text-mainText hover:bg-blue-100 hover:text-primary transition-colors duration-200 ease-in-out"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="text-lg" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm rounded-md text-mainText hover:bg-blue-100 hover:text-primary transition-colors duration-200 ease-in-out"
            role="menuitem"
          >
            <FiLogOut className="text-lg" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
const Header = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [loadDrawer, setLoadDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setLoadDrawer(true);
    setOpen(true);
  };

  const headerItems = [
    { displayName: "Home", link: "/" },
    { displayName: "Courses", link: "/courses" },
    { displayName: "Dashboard", link: "/dashboard" },
    { displayName: "Story", link: "/story" },
    { displayName: "Contact", link: "/contact" },
  ];
  const authenticated = !!user;

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
            <button onClick={handleOpenDrawer} className="hidden lg:flex items-center bg-[#EFF4F8] font-[450] hover:shadow-md text-primary-muted px-4 py-2 rounded-full text-[14px]">
              <FaSearch className="mr-2" />
              Search here
            </button>


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
            {authenticated && <AuthenticatedProfileState user={user} />}

            <span className="lg:hidden">
              <button onClick={handleOpenDrawer} className="hidden lg:flex items-center bg-[#EFF4F8] font-[450] hover:shadow-md text-primary-muted px-4 py-2 rounded-full text-[14px]">
                <FaSearch className="mr-2" />
                Search here
              </button>

            </span>
          </div>
        </div>
        {loadDrawer && (
          <Suspense fallback={<div className="w-8 h-8" />}>
            <Drawer open={open} setOpen={setOpen} />
          </Suspense>
        )}


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
