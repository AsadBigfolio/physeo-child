import LegalsLayout from "@/components/LegalsLayout";
export const metadata = {
  title: 'Privacy Policy',
  description: "Super Natural",
};
const PrivacyPolicy = () => {
  const headingClass = "text-title-lg text-primary "
  const descriptionClass = "text-subtitle-md font-poppins "
  const subheadingClass = "text-title-lg text-primary";
  const listClass = "list-disc ml-6 text-subtitle-md ";

  return (
    <>
      <LegalsLayout title={"Privacy Policy"}>
        <div className="text-mainText flex flex-col gap-y-[15px] w-full">
          <h1 className="text-heading-xl text-primary mb-[20px] md:mb-[30px]">
            Privacy Policy
          </h1>
          <h1 className={headingClass}>The Supernatural University Privacy Policy</h1>
          <p className={descriptionClass}>
            We get it. Your privacy is important to you, and it is important to us too. But because we want to provide you with the most efficient, enhanced, and secured service, we may request information about you. This Privacy Policy outlines your privacy rights for using The Supernatural University service and lets you know how we (&quot;The Supernatural University&quot;) collect, use, store, and otherwise share information you have provided us in order to use our services.
          </p>

          <p className={descriptionClass}>
            This Privacy Policy, in conjunction with our Terms of Service as well as any other agreements or policies provided by The Supernatural University, governs your use of our services. If you do not agree with this Privacy Policy, our Terms of Service, or any other agreements or policies that govern use of our service, do not use any of our services.
          </p>

          <h2 className={subheadingClass}>About this Privacy Policy</h2>
          <ul className={listClass}>
            <li>This Privacy Policy covers our treatment of personally identifiable information that we collect when you are on our sites, and when you use any of our services.</li>
            <li>This policy does not apply to the practices of other organizations that we do not own or control, or to people that we do not manage or employ. The Supernatural University may contain links to other sites, and we are not responsible for the privacy practices or the content of those sites.</li>
          </ul>

          <h2 className={subheadingClass}>Summary of Information We Collect and Track</h2>
          <ul className={listClass}>
            <li>
              <strong>General Usage Information:</strong> The Supernatural University collects information about all users collectively, such as what areas users visit and what services members use. This data is automatically retrieved. This type of general information is not used to identify specific users but in aggregate form to help us analyze traffic patterns and enhance our service to better serve our users and advertisers.
            </li>
            <li>
              <strong>Member Registration:</strong> When you register on any site or service provided by The Supernatural University, we ask for personal information such as a username, first name, last name, email address, password, country, and other related information. This information is required to provide a course to you and secure your course progress and completion.
            </li>
          </ul>

          <h2 className={subheadingClass}>Information We Collect Using Automated Processes</h2>
          <p className={descriptionClass}>
            When you access any part of our service, including browsing our website, reviewing articles, and/or reviewing our course catalog and course listings, we collect technical information through automated means. This may include:
          </p>
          <ul className={listClass}>
            <li>Technical information about the device or computer you’re using to access our services, such as date/time of visit, device type, IP address, operating system, browser, browser language, and other system information;</li>
            <li>Usage statistics about your interaction with our services, such as pages visited, courses accessed, time spent on pages, search queries, click data, and more.</li>
          </ul>

          <h2 className={subheadingClass}>What We Do with Collected Data</h2>
          <p className={descriptionClass}>
            The Supernatural University uses collected information for various purposes, such as:
          </p>
          <ul className={listClass}>
            <li>General statistics, traffic analysis, and site usage.</li>
            <li>Order fulfillment, course progress tracking, and providing customer support.</li>
            <li>Security and account preferences, including preventing fraud and abuse.</li>
          </ul>

          <h2 className={subheadingClass}>How to Contact Us</h2>
          <p className={descriptionClass}>
            The Supernatural University is committed to protecting your privacy. If you have any questions regarding our privacy policy, please contact <a href="mailto:info@TheSupernaturalUniversity.com">info@TheSupernaturalUniversity.com</a>.
          </p>

        </div>
      </LegalsLayout>
    </>
  );
};

export default PrivacyPolicy;
