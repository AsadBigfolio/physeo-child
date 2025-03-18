import Banner from "../UI/Banner";
import LegalLinksContainer from "./LegalLinksContainer";

const LegalsLayout = ({ children, title }) => {
  return (
    <div>
      <Banner title={title} />
      <div className="max-w-[1320px] px-[20px] py-5 md:py-[80px] mx-auto flex flex-col gap-y-5 md:gap-y-12">
        <LegalLinksContainer/>
        {children}
      </div>
    </div>
  );
};

export default LegalsLayout;
