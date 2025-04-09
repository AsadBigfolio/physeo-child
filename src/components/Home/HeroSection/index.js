import PrimaryLink from '@/components/PrimaryLink';
const courses = [
  {
    title: "Med - Preclinical",
    description: "Lorem ipsum dolor sit amet sui.",
    icon: '/new/medPreclinical.svg',
  },
  {
    title: "Med - Clinical",
    description: "Lorem ipsum dolor sit amet sui.",
    icon: '/new/medClinical.svg',
  },
  {
    title: "Physician Assistant",
    description: "Lorem ipsum dolor sit amet sui.",
    icon: '/new/physician.svg',
  },
  {
    title: "Doctor of Dental Surgery",
    description: "Lorem ipsum dolor sit amet sui.",
    icon: '/new/surgery.svg',
  },
];
export default function HeroSection() {
  return (
    <section className="relative w-full text-center">

      <div className="mx-auto mt-[100px]">
        <h1 className="text-[36px] font-semibold text-mainText leading-[100%]">
          We facilitate USMLE aspirants for Step 1 & <br />
          Step 2CK with self-paced study plan
        </h1>
        <p className="text-primary-muted mt-[20px] font-[450] leading-[20px] text-[16px]">
          Physician Assistant specific to didactic and clinical learning as preparation.
        </p>

        <div className="mt-[28px]">
          <div className='flex justify-center'>
            <PrimaryLink
            title="Start 14-day Trial"
            href="/signup"
          />
          </div>
          <p className="text-primary-muted font-medium leading-[20px] text-[12px] mt-[6px]">
            Or $400/year with 14-day money-back guarantee
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-[20px] mt-[82px] pb-[42px] flex-wrap">
        {courses.map((brand, index) => (
          <div className="flex items-center h-[80px] p-[16px] gap-[12px] bg-white rounded-[12px] w-fit">
            <img src={brand.icon} alt={brand?.title} />
            <div className='text-left'>
              <h2 className="card-heading">{brand?.title}</h2>
              <p className="muted-description">{brand?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
