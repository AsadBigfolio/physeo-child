"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@/svgs/EditIcon";
import TextInput from "@/components/InputFields/Textinput";
import TextAreaInput from "@/components/InputFields/TextAreaInput";
import { trpc } from "@/utils/trpcClient";
import { formatErrors } from "@/utils/formatTRPCErrors";
import Spinner from "@/components/UI/Spinner";
import Button from "../UI/Button";
import { toast } from "sonner";
import UserContext from "@/context/user";
import SelectInput from '../InputFields/SelectInput';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from "react-icons/fa";
import { FREEPLAN, HOUSEOPTIONS, PREMIUMPLAN, STANDARDPLAN } from '@/utils/constant';

const SubmitButton = ({ loading }) => {
  return (
    <Button className="py-6 px-8 text-lg" type="submit" loading={loading}>
      Save
    </Button>
  );
};

const EditProfile = ({ setShowEditProfileModal }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const userData = user;
  const fileInputRef = useRef(null);
  const inputLabelColor = "#00000073";
  const inputBorderColor = "#00000073";

  const [userImage, setUserImage] = useState(userData?.image);
  const [imageLoading, setImageLoading] = useState(false);

  const { mutate: uploadFilestoDB } = trpc.file.upload.useMutation();
  const { mutateAsync: getSignedUrl } = trpc.file.signedUrl.useMutation();
  const {
    mutate: editProfile,
    error: editProfileError,
    isPending: editPending,
  } = trpc.user.editProfile.useMutation({
    onSuccess: () => {
      setShowEditProfileModal();
      toast.success("Profile updated successfully.")
      window.location.reload()
    },
    onError: (error) => {
      console.error("Error creating WatchLater document:", error);
    },
  });
  const { mutate: updateImage, error: updateImageError, isPending: imageUpdateLoading } =
    trpc.user.updateProfileImage.useMutation({
      onSuccess: () => {
        router.refresh();
      }
    });

  useEffect(() => {
    if (userData?.image) {
      setUserImage(userData?.image);
    }
  }, [userData]);


  const uploadToS3 = (uploadUrl, file) =>
    fetch(uploadUrl, {
      method: "PUT",
      body: file,
    });

  const handleEditIconClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event) => {
    setImageLoading(true);
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      try {
        const { uploadUrl, publicUrl } = await getSignedUrl({
          fileName: file.name,
          fileType: file.type,
        });
        await uploadToS3(uploadUrl, file);

        const imageObject = {
          type: file.type,
          src: publicUrl,
          size: file.size,
          name: file.name,
        };
        await uploadFilestoDB([imageObject]);
        updateImage({ userId: user?._id, image: publicUrl });
        setUserImage(publicUrl);
      } catch (error) {
        console.error("Error handling file change:", error);
        // setUploadStatus("Error uploading file");
        setImageLoading(false);
      }
    }
    setImageLoading(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    editProfile(formObject);
  };
  const deleteImage = () => {
    updateImage({ userId: user?._id, image: '' });
    setUserImage('');
  }
  const formattedErrors = formatErrors(editProfileError);
  return (
    <div className="w-full">
      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="userId" value={user?._id} />

        <div className="w-full flex justify-between mb-[30px] 2xl:mb-[50px]">
          <p className="font-syne text-heading-md 2xl:text-[36px] font-semibold">View Details</p>
          <SubmitButton loading={editPending} />
        </div>

        <div className="mb-[30px] 2xl:mb-[30px]">
          <label className={`text-[14px] xl:text-para-base font-poppins `}>
            Profile Photo
          </label>
          <div className="flex relative w-[100px]">

            <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden">
              <img
                src={userImage || "/DummyProfilePic.jpg"}
                alt="profile image"
                className="h-full w-full object-cover"
              />
            </div>
            {imageLoading || imageUpdateLoading ? (
              <span className="absolute bottom-0 right-0 cursor-pointer">
                <Spinner color="black" />
              </span>
            ) : (
              <span
                className="absolute bottom-0 right-0 cursor-pointer"
                  onClick={userImage ? deleteImage : handleEditIconClick}
              >
                  {userImage && <div className='bg-primary rounded-full p-2 border-white border-[3px]'>
                    <FaRegTrashAlt color='white' />
                  </div>}
                  {!userImage && <div className='bg-primary rounded-full border-white border-[3px]'>
                    <EditIcon />
                  </div>}
              </span>

            )}
            {!userImage && <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />}
          </div>
        </div>
        <div className="w-[100px] text-center my-5">
          <label className={`text-[14px] xl:text-para-base font-poppins `}>
            House of Light
          </label>
          <div className="relative h-[100px] w-[100px] rounded-full overflow-hidden">
            <img
              src={`/Houses_of_Light/${userData.houseOfLight}.PNG`}
              alt={`${userData.houseOfLight} house`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[26px]">
            <input
              type="hidden"
              name="image"
              value={userImage}
              style={{ display: "none" }}
            />
            <TextInput
              label={"First Name"}
              name={"firstName"}
              placeholder={"John"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.firstName}
              defaultValue={userData.firstName}
            />
            <TextInput
              label={"Last Name"}
              name={"lastName"}
              placeholder={"Doe"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.lastName}
              defaultValue={userData.lastName}
            />
            <SelectInput
              label={"Gender"}
              name={"gender"}
              placeholder={"Male"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.gender}
              defaultValue={userData.gender}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Others', value: 'others' },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[26px]">
            <TextInput
              label={"Username"}
              name={"userName"}
              placeholder={"John"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.userName}
              defaultValue={userData.userName}
            />
            <TextInput
              label={"Email"}
              name={"email"}
              placeholder={"me@mail.com"}
              type={"text"}
              disabled
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.email}
              defaultValue={userData.email}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[26px]">
            <TextInput
              label={"Phone Number"}
              name={"phoneNumber"}
              placeholder={"+88 99556677"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.phoneNumber}
              defaultValue={userData.phoneNumber}
            />
            <SelectInput
              label={"House of Light"}
              name={"houseOfLight"}
              placeholder={"Slytherin"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.houseOfLight}
              defaultValue={userData.houseOfLight}
              options={HOUSEOPTIONS}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[26px]'>
            <TextInput
              label={"Address"}
              name={"address"}
              placeholder={"17 Street Gryfindor"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              error={formattedErrors.address}
              defaultValue={userData.address}
            />
            <SelectInput
              label={"Plan"}
              name={"plan"}
              placeholder={"User Subscribed Plan"}
              type={"text"}
              labelClasses={`text-[${inputLabelColor}]`}
              inputClasses={`text-[${inputBorderColor}]`}
              options={[
                {
                  label: '👨🏻‍💼 FREE PLAN',
                  value: FREEPLAN
                },
                {
                  label: '🚀 STANDARD PLAN',
                  value: STANDARDPLAN
                },
                {
                  label: '🏢 PREMIUM PLAN',
                  value: PREMIUMPLAN
                }
              ]}
              defaultValue={userData?.subscribedPlans?.length ? userData?.subscribedPlans[0]?.plan : [FREEPLAN]}
              disabled={true}
            />
          </div>
          <TextAreaInput
            label={"About me"}
            name={"about"}
            placeholder={"about me"}
            type={"text"}
            labelClasses={`text-[${inputLabelColor}]`}
            inputClasses={`text-[${inputBorderColor}]`}
            error={formattedErrors.about}
            defaultValue={userData.about}
          />
        </div>
      </form>
    </div>
  );

};

export default EditProfile;
