import Link from "next/link";

const CourseCard = ({course }) => {
  const { image, title, sections, slug } = course
  return (
    <Link href={`courses/${slug}`} className="bg-white rounded-[14px] shadow-md overflow-hidden cursor-pointer">
      <img
        className={`w-full h-[198px] ${slug === '#' ? '' : 'object-cover'}`}
        src={image?.src}
        alt={title}
      />
      <div className='p-[10px]'>
        <h2 className="text-base md:text-lg font-semibold text-[#202020CC] leading-tight capitalize">{title}</h2>
        <p className="text-para-base md:text-title-lg text-gray-600">
        Sections: {sections.length}
      </p>
      </div>
    </Link>
  );
};
export default CourseCard;
