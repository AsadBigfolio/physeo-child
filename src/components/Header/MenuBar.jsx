"use client";
import React, { Suspense } from 'react';
import { cn } from "@/utils/classNames";
import { IoIosMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
const RoundedButton = React.lazy(() => import('../Home/RoundedButton'));
const MenuBar = ({
  isOpen,
  setIsOpen,
  authenticated,
  headerItems,
  mobileHeaderItems,
  handleLogout,
}) => {
  const router = useRouter();

  const handleRouteClick = (link) => {
    setIsOpen(false);
    router.push(link);
  };

  const RouteButton = ({ item }) => {
    return (
      <button
        type="button"
        className="w-full text-start text-title-lg transition-all rounded-[10px] bg-background p-3 text-primary  hover:bg-primary-light"
        onClick={() => handleRouteClick(item.link)}
      >
        {item.displayName}
      </button>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-60 z-[550]"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={cn(
          "bg-white fixed inset-0 w-[70vw] px-[20px] py-[10px] z-[600] transition-all flex flex-col overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <span className="mb-[40px]" onClick={() => setIsOpen(false)}>
          <IoIosMenu size={32} />
        </span>
        <div className="w-full h-full flex flex-col gap-2">
          {headerItems.map((item) => (
            <RouteButton item={item} key={item.path} />
          ))}
          {!authenticated && (
            <>
              {mobileHeaderItems.map((item) => (
                <RouteButton item={item} key={item.path} />
              ))}
              <div className="flex grow items-end">
                <Suspense fallback={<div>Loading...</div>}>
                  <RoundedButton
                    href={'/signup'}
                    text="Join for Free"
                  />
                </Suspense>
              </div>
            </>
          )}
          {authenticated && (
            <>
              <button
                role="button"
                aria-label="Go to Profile"
                onClick={() => handleRouteClick("/profile")}
                className="w-full text-start rounded-[10px] bg-background p-3 text-primary  text-title-lg transition-all text-black hover:bg-primary-light mb-[5px]"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-start rounded-[10px] bg-background p-3 text-primary  text-title-lg transition-all text-black hover:bg-primary-light"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuBar;
