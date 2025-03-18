import React from "react";
import getCourseBySlug from "@/queries/course/getCourseBySlug";
import Sidebar from "@/components/CourseDetails/Sidebar";
import UserCourseProvider from "@/providers/UserCourseProvider";
import MobileSidebar from "@/components/CourseDetails/Sidebar/MobileSidebar";
export async function generateMetadata({ params }) {
  const { slug } = params;
  const courseData = await getCourseBySlug(slug);
  return {
    title: `${courseData?.title || "Course"}`,
    description: courseData?.description || "Learn and grow with our courses.",
    keywords: `${courseData?.title}, online courses, education, ${courseData?.tags?.join(", ")}`,
    openGraph: {
      title: courseData?.title || "Course Page",
      description: courseData?.description || "Learn and grow with our courses.",
      url: `https://thesupernaturaluniversity.com/courses/${slug}`,
      images: [
        {
          url: courseData?.image?.src || "/default-course.jpg",
          width: 1200,
          height: 630,
          alt: courseData?.image?.name || "Course Image",
        },
      ],
      type: "website",
      site_name: "My Platform",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: courseData?.title || "Course Page",
      description: courseData?.description || "Learn and grow with our courses.",
      images: [courseData?.image?.src || "/default-course.jpg"],
    },
  }
}
const layout = async ({ children, params }) => {
  const { slug } = params;
  const courseData = await getCourseBySlug(slug);

  const serializedCourseData = JSON.stringify(courseData);
  const courseDetails = JSON.parse(serializedCourseData);
  return (
    <UserCourseProvider defaultCourse={courseDetails}>
      <div className="flex flex-col md:flex-row items-start justify-center bg-white">
        <MobileSidebar />
        <div className="grid grid-cols-3 items-start w-full max-h-[calc(100vh-100px)] max-w-screen overflow-hidden">
          <div className="w-full h-fit md:overflow-y-auto md:max-h-[calc(100vh-100px)] max-h-screen col-span-3 md:col-span-2 items-start flex-col">
            {children}
          </div>
          <div className="hidden md:block">
            <Sidebar sections={courseDetails.sections} />
          </div>
        </div>
      </div>
    </UserCourseProvider>
  );
};

export default layout;
