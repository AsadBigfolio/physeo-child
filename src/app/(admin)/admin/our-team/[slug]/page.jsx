"use client";

import React, { useContext, useEffect, useMemo } from "react";
import TextAreaInput from "@/components/InputFields/TextAreaInput";
import Page from "@/components/UI/Page";
import Card from "@/components/UI/Card";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import TextInput from "@/components/InputFields/Textinput";
import { toast } from "sonner";
import StoryContext from "@/context/story";
import SelectInput from "@/components/InputFields/SelectInput";
import MediaInput from '@/components/InputFields/MediaInput';

const AddStory = ({ params }) => {
  const { slug } = params;
  const { story, updateStory } = useContext(StoryContext);
  const {
    mutate: createMutation,
    isPending: isCreateLoading,
    error: onCreateError,
  } = trpc.story.create.useMutation();
  const {
    mutate: updateMutation,
    isPending: isUpdateLoading,
    error: onUpdateError,
  } = trpc.story.update.useMutation();
  const { data: storyData, isLoading: storyLoading } =
    trpc.story.getById.useQuery(
      {
        id: slug,
      },
      {
        enabled: slug !== "create",
      }
    );
  const breadcrumbs = [
    {
      label: "Our Team",
      destination: "/admin/our-team",
    },
    {
      label: slug === "create" ? "Add Member" : "Update Member",
      destination: "/admin/our-team/create",
    },
  ];

  const formattedErrors = useMemo(() => {
    return (
      safeJSONParse(onCreateError?.message ?? onUpdateError?.message)?.reduce(
        (acc, error) => {
          acc[error.path.join("_")] = error.message;
          return acc;
        },
        {}
      ) || {}
    );
  }, [onCreateError, onUpdateError]);

  const handleUpdate = () => {
    if (slug === "create") {
      return;
    }
    if (storyData) {
      const updatedData = {
        name: storyData?.name,
        image: storyData?.image,
        role: storyData?.role,
        status: storyData?.status,
      };
      updateStory(updatedData);
    }
  };
  const actionHandler = () => {
    if (slug === "create") {
      const createStory = { ...story, image: story?.image?._id };
      createMutation(createStory, {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error) => {
          // toast.error(error.message);
        },
      });
    } else {
      const updateStoryData = { ...story, image: story?.image?._id };
      updateMutation(
        { id: slug, ...updateStoryData },
        {
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (error) => {
            // toast.error(error.message);
          },
        }
      );
    }
  };
  
  useEffect(() => {
    handleUpdate();
  }, [slug, storyData]);

  return (
    <>
      <Page
        header={{
          backAction: {
            url: "/admin/our-team",
          },
          title: slug === "create" ? "Add Member" : "Update Member",
          primaryAction: {
            content: slug === "create" ? "Save" : "Update",
            type: "button",
            loading: isCreateLoading || storyLoading || isUpdateLoading,
            onAction: () => {
              actionHandler();
            },
          },
        }}
        fullWidth={false}
        breadcrumbs={breadcrumbs}
      >
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-3">
            <TextInput
              label={"Name"}
              placeholder={"Name"}
              type={"text"}
              error={formattedErrors.name}
              value={story.name}
              onChange={(e) => updateStory({ name: e.target.value })}
            />
            <div className="mt-3">
              <TextInput
                label={"Role"}
                placeholder={"Role"}
                type={"text"}
                error={formattedErrors.role}
                value={story.role}
                onChange={(e) => updateStory({ role: e.target.value })}
              />
            </div>
            <MediaInput
              label={"Image"}
              name={"image"}
              placeholder={"https://example.com/image.jpg"}
              type={"text"}
              defaultMedia={story.image ? [story.image] : []}
              error={formattedErrors.image}
              onChange={([e]) => updateStory({ image: e })}
            />
            <div className="mt-3">
              <SelectInput
                label={"Status"}
                name={"status"}
                placeholder={"Active/Inactive"}
                type={"text"}
                value={story.status}
                error={formattedErrors.status}
                options={[
                  { label: "Publish", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
                onChange={(e) => updateStory({ status: e.target.value })}
              />
            </div>
          </Card>
        </div>
      </Page>
    </>
  );
};

export default AddStory;
