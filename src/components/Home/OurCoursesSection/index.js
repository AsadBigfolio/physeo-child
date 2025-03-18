import Image from "next/image";
import RoundedButton from "../RoundedButton";
import getCourses from "@/queries/course/getCourses";

const OurCoursesSection = async () => {
  const dummyCourseImage = "/Course1.png";
  const coursesPromise = await getCourses(100, 1, "");
  const coursesData = JSON.parse(coursesPromise);
  const coursesList = coursesData?.courses?.length ? coursesData?.courses : [];
  const certificateCourseData = {
    slug: "#",
    image: {
      src: dummyCourseImage,
    },
    title: "Our Courses",
  };
  return (
    <div
      className="flex flex-col md:gap-y-8 gap-y-5 md:items-center py-5 md:py-[80px] relative"
    >
      <div className="hidden md:block absolute -z-10 bg-primary h-[400px] w-[400px] opacity-40 top-[250px] left-[80px] blur-[200px] rounded-full" />
      <div className="w-full flex flex-col items-center text-center gap-5 mb-[30px] md:mb-0 md:max-w-[460px] 2xl:min-w-[555px]">
        <h2 className="text-heading-xl">
          Our <span className="text-primary">Courses</span>
        </h2>
        <p className="font-poppins text-subtitle-md text-[#202020] max-w-[645px]">
          For your edutainment we offer 7 areas of study.
          Cryptozoology, Ufology, Paranormalogy,
          Conspiracy, Magicology, Phenomenology and
          The Unexplained.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 w-full">
        {[...coursesList, certificateCourseData].map((course, index) => (
          <div
            className="h-[317px] md:h-[400px] rounded-[10px] overflow-hidden relative bg-white shadow-md"
            key={index}
          >
            <Image
              src={course?.image?.src ?? dummyCourseImage}
              objectFit="cover"
              fill={true}
              alt={course.title}
            />
            <div className="absolute h-full w-full inset-0 flex justify-end px-[14px] 2xl:px-[25px] flex-col">
              <RoundedButton
                href={`/certificates#${course.title}`}
                text={course.title}
                secondary
                className="bg-white !w-full mb-[17px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCoursesSection;
