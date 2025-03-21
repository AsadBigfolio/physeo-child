import TextInput from "@/components/InputFields/Textinput";
import ResourceList from "@/components/UI/ResourceList";
import Thumbnail from "@/components/UI/Thumbnail";
import Button from "@/components/UI/Button";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCourseStore } from "@/providers/CourseProvider";
import { sectionSchema } from '@/validations/courseSchema';
import { formatErrors } from '@/utils/formatTRPCErrors';
import { useEffect, useState } from 'react';
import { z } from "zod";

const SectionVideos = ({ section, setAddModalOpen, setAddQuizModalOpen }) => {
  const [validationErrors, setValidationErrors] = useState(null);
  const { setSelectedVideoIndex, updateCourse, course, } =
    useCourseStore();
  const videos = [...section.videos];
  const handleErrors = () => {
    try {
      sectionSchema.parse(section);
      setValidationErrors(null)

    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(formatErrors(error));
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  useEffect(() => {
    handleErrors()
  }, [section])
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
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

        <TextInput
          label="Flash Card link"
          onChange={(e) => {
            updateCourse({
              sections: course.sections.map((s) => {
                if (s._id === section._id) {
                  return { ...s, flashCardLink: e.target.value };
                }
                return s;
              }),
            });
          }}
          error={validationErrors?.flashCardLink}
          value={section.flashCardLink}
        />
      </div>

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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAddQuizModalOpen(true)
                        setSelectedVideoIndex(row.index);
                      }
                      }
                    >
                      {row?.original?.quiz ? "Edit Quiz" : "Add Quiz"}
                    </Button>
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
                      className="p-2 rounded-full text-red-500"
                      title="Delete"
                      onClick={() => {
                        updateCourse({
                          sections: course.sections.map((s) => {
                            if (s._id === section._id) {
                              return {
                                ...s,
                                videos: s.videos.filter((v, index) =>
                                  row.original._id ? v._id !== row.original._id : index !== row.index
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
              disabled={validationErrors}
            onClick={() => setAddModalOpen(true)}
          >
            Add Video
          </Button>
        </div>
      )}
    </>
  );
};

export default SectionVideos;
