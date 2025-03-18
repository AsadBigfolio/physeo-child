import TextAreaInput from "@/components/InputFields/TextAreaInput";
import TextInput from "@/components/InputFields/Textinput";
import ResourceList from "@/components/UI/ResourceList";
import Thumbnail from "@/components/UI/Thumbnail";
import Button from "@/components/UI/Button";
import { cn } from "@/utils/classNames";
import { memo, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCourseStore } from "@/providers/CourseProvider";

const SectionVideos = ({ section, setAddModalOpen, setAddQuizModalOpen }) => {
  const { setSelectedVideoIndex, updateCourse, course, selectedSectionIndex } =
    useCourseStore();
  const videos = [...section.videos];

  return (
    <div className="">
      <TextInput
        label="Title"
        onChange={(e) => {
          updateCourse({
            sections: course.sections.map((s) => {
              if (s._id === section._id) {
                return { ...s, title: e.target.value };
              }
              return s;
            }),
          });
        }}
        value={section.title}
      />
      {videos?.length > 0 ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className={`text-para-base font-poppins font-semibold`}>
              Videos
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAddQuizModalOpen(true)}
              >
                {section.quiz ? "Edit Quiz" : "Add Quiz"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAddModalOpen(true)}
              >
                Add Video
              </Button>
            </div>
          </div>
          <ResourceList
            hideHeader
            name="Videos"
            pagination={false}
            columns={[
              {
                header: "",
                accessorKey: "image",
                width: "100px",
                cell: ({ row }) => {
                  return (
                    <Thumbnail
                      src={row.original.thumbnail?.src}
                      alt="course"
                      className=""
                    />
                  );
                },
              },
              {
                header: " ",
                accessorKey: "title",
              },
              {
                header: " ",
                cell: ({ row }) => (
                  <div className="flex space-x-2 justify-end pr-10">
                    <button
                      onClick={() => {
                        setSelectedVideoIndex(row.index);
                        setAddModalOpen(true);
                      }}
                      title="Edit"
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="p-2 rounded-full  text-red-500"
                      title="Delete"
                      onClick={() => {
                        updateCourse({
                          sections: course.sections.map((s) => {
                            if (s._id === section._id) {
                              return {
                                ...s,
                                videos: s.videos.filter(
                                  (v) => v._id !== row.original._id
                                ),
                              };
                            }
                            return s;
                          }),
                        });
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                ),
              },
            ]}
            data={videos}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2 h-32 flex-col">
          <p className="text-gray-500 text-sm">No videos added yet</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddModalOpen(true)}
          >
            Add Video
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionVideos;
