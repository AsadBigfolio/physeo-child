import Banner from "@/components/UI/Banner";
import EditProfileContainer from "@/components/Profile/EditProfileContainer";
import "./profilePage.css";
import YourBadges from "@/components/Profile/YourBadges";
import { getBadges } from '@/queries/badge/getBadges';
import TabComponent from '@/components/Tabs';
import CopyableLink from '@/components/CopyableLink';
export const metadata = {
  title: 'Profile',
  description: "Super Natural",
};
const UserProfile = async () => {
  const badges = await getBadges(1, 10000, '')
  return (
    <div className="bg-secondaryWhite">
      <Banner title={"Profile"} />
      <div className="flex flex-col gap-y-14 max-w-[1320px] px-[20px] py-[20px] md:py-[80px] mx-auto">
          <div className="flex space-x-[10px] md:space-x-[20px]">
            <EditProfileContainer />
        </div>
        <YourBadges/>
        <CopyableLink />
        <TabComponent badges={JSON.parse(JSON.stringify(badges?.badges ?? []))} />
      </div>
    </div>
  );
};

export default UserProfile;
