"use client";
import { useState, useContext } from "react";
import EditProfile from "./EditProfile";
import RightArrow from "@/svgs/RightArrow";
import UserContext from "@/context/user";
import Modal from '../UI/Modal';

const EditProfileContainer = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
        <>
          <div className="relative h-[80px] w-[80px] md:h-[140px] md:w-[140px] 2xl:h-[175px] 2xl:w-[175px] rounded-full overflow-hidden">
            <img
              src={user?.image || "/DummyProfilePic.jpg"}
              alt="profile image"
              objectFit="cover"
              className='w-full h-full'
              fill={true}
            />
          </div>
          <div>
            <div className="mb-[30px] 2xl:mb-[50px]">
              <h2 className="text-title-lg md:text-title-xl 2xl:text-[26px] font-syne font-bold text-mainText">
                {user?.userName ?? ''}
              </h2>
              <p className="font-syne text-title-lg 2xl:text-para-lg opacity-60">{user?.email }</p>
            </div>
            <button
              className="flex items-center gap-x-2 bg-[#491A8B] pl-[15px] pr-[4px] h-[35px] 2xl:h-[50px] rounded-[100px] text-white outline-none"
              onClick={() => setShowEditProfileModal(true)}
            >
              <p className="text-para-base 2xl:text-subtitle-md font-semibold">View Details</p>
              <span className="bg-white h-[26px] w-[26px] 2xl:h-[36px] 2xl:w-[36px] flex items-center justify-center rounded-full">
                <div className="block 2xl:hidden">
                  <RightArrow width={12} height={16} />
                </div>
                <div className="hidden 2xl:block">
                  <RightArrow width={24} height={19} />
                </div>
              </span>
            </button>

            <Modal open={showEditProfileModal} onClose={() => setShowEditProfileModal(false)}>
              <EditProfile
                user={user}
                setShowEditProfileModal={setShowEditProfileModal}
              />
            </Modal>
            {/* {showEditProfileModal && (
              <div className="fixed h-screen w-screen z-[150] inset-0 flex items-center justify-center">
                <div
                  className="absolute h-screen w-screen inset-0 bg-black opacity-45 z-10"
                  onClick={() => setShowEditProfileModal(false)}
                />
                <div className="relative z-20 bg-white py-[50px] px-[60px] w-[1096px] rounded-[30px] max-h-[90vh] overflow-y-auto hide-scrollbar">
                  <EditProfile
                    user={user}
                    setShowEditProfileModal={setShowEditProfileModal}
                  />
                </div>
              </div>
            )} */}
          </div>
        </>
      )}
    </>
  );
};

export default EditProfileContainer;