import CourseCard from "../CourseCard";

const CourseList = ({ courses }) => {
  const certificateCourseData = {
    slug: "#",
    image: {
      src: "/Final_Wendy/Conspiracy.jpg",
    },
    title: "Certificate",
    sections: [1, 2],
  };
  return (
    <>
      <h1 className="text-center md:text-left text-heading-xl mb-[20px] md:mb-[50px]">Our Courses</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:gap-x-7 gap-y-5 gap-x-5 md:gap-y-10">
        {[...courses, certificateCourseData].map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </>
  );
};
export default CourseList;
