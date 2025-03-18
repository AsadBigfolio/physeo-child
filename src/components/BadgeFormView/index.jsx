import React, { useState } from "react";
import TextInput from "@/components/InputFields/Textinput";
import MediaInput from "@/components/InputFields/MediaInput";
import SelectInput from "@/components/InputFields/SelectInput";
import Card from "@/components/UI/Card";
import TextAreaInput from "../InputFields/TextAreaInput";
import { useBadgeStore } from "@/providers/BadgeProvider";
import { trpc } from '@/utils/trpcClient';

const SectionsSelect = ({ value, formattedErrors: errors, onChange, course }) => {
  const { data: sections, isPending } = trpc.course.getSectionsByCourseId.useQuery({
    courseId: course,
  });

  return (
    <div className="mt-3">
      {isPending ? (
        <div>Loading sections...</div>
      ) : (
        sections?.length > 0 && (
          <SelectInput
            label="Sections"
            name="section"
            placeholder="Sections"
            value={value}
            error={errors}
            options={[
              { label: "Select Section", value: "" },
              ...sections.map((sec) => ({ label: sec.title, value: sec._id })),
            ]}
            onChange={(e) => onChange({ section: e.target.value })}
          />
        )
      )}
    </div>
  );
};


const BadgeFormView = ({ courses, formattedErrors }) => {
  const { badge, updateBadge } = useBadgeStore();
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-3">
        <TextInput
          label="Title"
          placeholder="Course Title"
          type="text"
          error={formattedErrors.title}
          value={badge.title}
          onChange={(e) => updateBadge({ title: e.target.value })}
        />
        <TextAreaInput
          label="Description"
          name="description"
          placeholder="Description"
          value={badge.description}
          error={formattedErrors.description}
          onChange={(e) => updateBadge({ description: e.target.value })}
        />
        <MediaInput
          label="Image"
          name="image"
          placeholder="https://example.com/image.jpg"
          type="text"
          value={badge.image}
          defaultMedia={badge.image}
          error={formattedErrors.image}
          onChange={(e) => updateBadge({ image: e })}
        />
        <div div className="mt-3">
          <SelectInput
            label="Status"
            name="status"
            placeholder="Active/Inactive"
            type="text"
            value={badge.status}
            error={formattedErrors.status}
            options={[
              { label: "Publish", value: "published" },
              { label: "Draft", value: "draft" },
            ]}
            onChange={(e) => updateBadge({ status: e.target.value })}
          />
        </div>
        <div className="mt-3">
          <SelectInput
            label="Course"
            name="course"
            placeholder="Course"
            value={badge.course}
            error={formattedErrors.course}
            options={[{ label: "Select Course", value: "" }, ...courses]}
            onChange={(e) => updateBadge({ course: e.target.value })}
          />
        </div>
        {badge.course &&
          <SectionsSelect
            value={badge.section}
            error={formattedErrors.section}
            onChange={updateBadge}
            course={badge.course}
          />}
      </Card>
    </div>
  );
};

export default BadgeFormView;
