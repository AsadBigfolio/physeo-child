import React, { useEffect, useState } from "react";
import TextInput from "@/components/InputFields/Textinput";
import MediaInput from "@/components/InputFields/MediaInput";
import SelectInput from "@/components/InputFields/SelectInput";
import TagInput from "@/components/InputFields/TagInput";
import Card from "@/components/UI/Card";
import { useBlogStore } from "@/providers/BlogProvider";
import Editor from "../Editor";

const BlogFormView = ({ formattedErrors }) => {
  const { blog, updateBlog } = useBlogStore();
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-3">
        <TextInput
          label={"Title"}
          placeholder={"Blog Title"}
          type={"text"}
          error={formattedErrors.title}
          value={blog.title}
          onChange={(e) => updateBlog({ title: e.target.value })}
        />
        <Editor
          label={"Description"}
          name={"description"}
          value={blog?.description}
          error={formattedErrors.description}
          onEditorChange={(e) => {
            updateBlog({ description: e });
          }}
        />
        <MediaInput
          label={"Image"}
          name={"image"}
          placeholder={"https://example.com/image.jpg"}
          type={"text"}
          defaultMedia={blog.image ? [blog.image] : []}
          error={formattedErrors.image}
          onChange={([file]) => updateBlog({ image: file })}
        />
        <SelectInput
          label={"Category"}
          name={"category"}
          placeholder={"Category Title/Inactive"}
          type={"text"}
          value={blog.category}
          error={formattedErrors.category}
          options={[
            { label: "Select Category", value: "" },
            { label: "Ufology", value: "ufology" },
            { label: "Conspiracy", value: "conspiracy" },
            { label: "Cryptozoology", value: "cryptozoology" },
            { label: "Paranormal", value: "paranormal" },
            { label: "Phenomenology", value: "phenomenology" },
            { label: "Magicology", value: "magicology" },
            { label: "Unexplained", value: "unexplained" },
          ]}
          onChange={(e) => updateBlog({ category: e.target.value })}
        />
        <div className="mt-3">
          <TagInput
            label={"Tags"}
            name={"tags"}
            placeholder={"Enter Tags"}
            type={"text"}
            value={blog.tags}
            error={formattedErrors.tags}
            onChange={(tags) => updateBlog({ tags })}
          />
        </div>
        <TextInput
          label={"Slug"}
          placeholder={"Slug"}
          type={"text"}
          error={formattedErrors.slug}
          value={blog.slug}
          onChange={(e) => updateBlog({ slug: e.target.value })}
        />
        <div className="mt-3">
          <SelectInput
            label={"Status"}
            name={"status"}
            placeholder={"Active/Inactive"}
            type={"text"}
            value={blog.status}
            error={formattedErrors.status}
            options={[
              { label: "Publish", value: "published" },
              { label: "Draft", value: "draft" },
            ]}
            onChange={(e) => updateBlog({ status: e.target.value })}
          />
        </div>
      </Card>
    </div>
  );
};

export default BlogFormView;
