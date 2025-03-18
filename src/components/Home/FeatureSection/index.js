import ProofIcon from "@/svgs/ProofIcon";
import AccessIcon from "@/svgs/AccessIcon";
import MaterialIcon from "@/svgs/MaterialIcon";
import LearningIcon from "@/svgs/LearningIcon";

const FeatureSection = () => {
  const featuresList = [
    {
      icon: <AccessIcon />,
      title: "Mystical Edutainment",
      description: " Enjoy interactive learning in supernatural studies",
    },
    {
      icon: <MaterialIcon />,
      title: "Distinguished Certificates",
      description: "Get Esteemed Scrolls of Achievement",
    },
    {
      icon: <LearningIcon />,
      title: "Prestigious Titles",
      description: "Earn a Unique Legacy of Titles",
    },
    {
      icon: <ProofIcon />,
      title: "Exclusive Merchandise",
      description: "Notable mech that few enjoy",
    },
  ];

  return (
    <div className="bg-[#e5def8] py-5 md:py-[24px] px-[23px] md:px-0 ">
      <div className='max-w-[1320px] px-[20px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-[110px]'>
      {featuresList.map((feature, index) => (
        <div className="flex flex-col items-center text-mainText" key={index}>
          <span className="">{feature.icon}</span>
          <h3 className="text-title-lg text-center mt-[20px]">
            {feature.title}
          </h3>
          <p className="font-poppins text-subtitle-md max-w-[238px] text-center text-[#4D4D4D] mt-[10px]">
            {feature.description}
          </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FeatureSection;
