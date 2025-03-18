import LegalsLayout from "@/components/LegalsLayout";
import DetailsDropDown from "@/components/DetailsDropDown";
export const metadata = {
  title: 'FAQ',
  description: "Super Natural",
};
const FAQ = () => {

  const faqData = [
    {
      title: 'What is The Supernatural University?',
      detail: 'Welcome to The Supernatural University, an online central hub where you can find information on unexplainable and often unbelievable events that occur in our mysterious world. Purely for entertainment purposes, or what we like to call "edutainment," our imaginations guide us as we bring together fascinating tales from all over our incredible planet. We’ve created this just for you in hopes that you have fun exploring familiar topics such as Big Foot to the lesser known Menehune of Hawaii and beyond.'
    },
    {
      title: 'Can I get a degree at The Supernatural University?',
      detail: 'Yes. We offer one degree for each of the seven courses of study. If you complete all seven courses, you will earn the prestigious PEHD (Paranormal Expert Honorary Degree).'
    },
    {
      title: 'What courses are offered at The Supernatural University?',
      detail: 'Currently, we offer seven courses of educational studies: Cryptozoology, UFOlogy, Conspiracy, Paranormal, Phenomenology, Unexplained, and Magicology. You may choose to study just one, all, or any number of courses that appeal to your Supernatural interests.'
    },
    {
      title: 'How are the courses formatted?',
      detail: 'Our courses are entirely online. There is no time limit as to how soon or how long you take to complete the requirements. Each course is divided into volumes. You must complete all volumes and quizzes to earn the degree.'
    },
    {
      title: 'How do I apply to The Supernatural University?',
      detail: 'You apply by going to The Supernatural University website or by clicking the link below: https://thesupernaturaluniversity.com/enroll'
    },
    {
      title: 'Is there an application fee?',
      detail: 'No, there is no application fee.'
    },
    {
      title: 'What are the admission requirements?',
      detail: 'You must be at least 13 years old or have a proclivity for what we teach. Please write to us if you have a unique situation: https://thesupernaturaluniversity.com/contact-us'
    },
    {
      title: 'Is The Supernatural University accredited?',
      detail: 'No. The Supernatural University IS NOT ACCREDITED BY AN ACCREDITING ORGANIZATION RECOGNIZED BY THE UNITED STATES SECRETARY OF EDUCATION Note: In the United States, many licensing authorities require accredited degrees as the basis for eligibility for licensing. In some cases, accredited colleges may not accept for transfer courses and degrees completed at unaccredited colleges, and some employers may require an accredited degree as a basis for eligibility for employment'
    },
    {
      title: 'How long will it take to graduate?',
      detail: 'The amount of time it takes to become a graduate of The Supernatural University is entirely dependent on you. Work at your own pace. You may study, take quizzes, review, etc. as quickly or as slowly as needed. Current graduates have reported being able to complete one course of study in under 2 months.'
    },
    {
      title: 'What materials do I need to complete my courses?',
      detail: 'You will need a functioning computer or tablet and a good internet connection. You may need a set of headphones or virtual reality goggles, but they are not required. Course materials, such as textbooks and quizzes, will all be included and accessible online.'
    },
    {
      title: 'How do I take quizzes?',
      detail: 'All quizzes will be taken online through your student portal. You will be directed to the quiz after completing the course.'
    },
    {
      title: 'Does The Supernatural University have a physical campus or is it exclusively an online university?',
      detail: 'Currently, The Supernatural University is exclusively an online university with a virtual campus in the Metaverse coming soon. A physical campus is currently in the planning stages.'
    },
    {
      title: 'Do I have to be a US citizen to sign up for classes at The Supernatural University?',
      detail: 'No, you do not have to be a U.S. citizen to apply at The Supernatural University. Currently, all courses are offered in English. We are currently working on translating all course material into multiple languages and translating them into closed captioning.'
    },
    {
      title: 'How can I contact the The Supernatural University if I need help?',
      detail: 'You may contact The SuperU via the website or by emailing us at: Dean@TheSupernaturalUniversity.com or https://thesupernaturaluniversity.com/contact-us'
    },
    {
      title: 'Can I become a professor at The Supernatural University?',
      detail: 'Here at The Supernatural University, we are always looking to include all worthy forms of education so please feel free to contact us at https://thesupernaturaluniversity.com/contact-us to provide us with your credentials and interest.'
    },
    {
      title: 'Where can I buy The Supernatural University swag?',
      detail: 'We have an exclusive online store on The Supernatural University website where you can purchase merchandise like shirts, hats, sweatshirts, and mugs to make all your fellow supernaturalists jealous. Visit the Merchandise page here: https://thesupernaturaluniversity.com/alumni-store'
    },
  ];


  return (
    <>
      <LegalsLayout title={"FAQs"}>
        <div className="text-mainText text-[25px] w-full ">
          <h1 className="text-heading-xl text-primary mb-[20px] md:mb-[30px] 2xl:mb-10">
            {"FAQ's"}
          </h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-[16px] gap-y-[25px] md:gap-y-[30px] mb-[30px] 2xl:mb-[100px]'>
            <div className='flex flex-col gap-4 '>
              {faqData.slice(0, 9).map((data, index) => (
                <div key={index}>
                  <DetailsDropDown
                    title={data.title}
                    details={data.detail}
                  />
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4 '>
              {faqData.slice(9, 16).map((data, index) => (
                <div key={index}>
                  <DetailsDropDown
                    title={data.title}
                    details={data.detail}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LegalsLayout>
    </>
  );
};

export default FAQ;
