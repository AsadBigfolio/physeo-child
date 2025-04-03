import PrimaryLink from '@/components/PrimaryLink';

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 text-center">
      {/* Background Circles */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-[600px] h-[600px] bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-[36px] font-semibold text-black ">
          We facilitate USMLE aspirants for Step 1 & <br />
          Step 2CK with self-paced study plan
        </h1>
        <p className="text-[#303030] mt-4 font-medium text-[16px]">
          The only comprehensive platform with conceptual videos and image mnemonics for
          Physician Assistant specific to didactic & clinical learning as preparation.
        </p>

        <div className="mt-6">
          <PrimaryLink
            title="Start 14-day Trial"
            href="/signup"
          />
          <p className="text-[#303030] font-semibold leading-[20px] text-[12px] mt-2">
            Or $400/year with 14-day money-back guarantee
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-12 flex-wrap">
        {["coursera", "udemy", "PHYSEO", "PhyseoPA", "udemy", "PHYSEO", "PhyseoPA"].map((brand, index) => (
          <div
            key={index}
            className="px-6 py-3 bg-white shadow-md rounded-xl text-lg font-semibold text-gray-800"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
