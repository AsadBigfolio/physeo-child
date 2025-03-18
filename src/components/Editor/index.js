import React from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
const editStyle = {
  preview_styles: "font-size color",
  height: 500,
  menubar: true,
  branding: false,
  contextmenu: "link image table",
  paste_data_images: true,
  images_replace_blob_uriss: true,
  plugins:
    "searchandreplace emoticons autolink codesample code charactermap fullscreen media help lists table wordcount visualblocks template quicktoolbar preview link image table",
  line_height_formats: "1 1.2 1.4 1.6 2",
  font_size_fformats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
  toolbar:
    "searchandreplace | emoticons | autolink | fullscreen | media | lists | quicktoolbar | preview | image | lineheight | fontsize | fontfamily | undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help  | visualblocks | template | wordcount | link | table | codesample | code | charactermap |",
  font_family_formats:
    "Andale Mono=andale mono,times;Raleway= Raleway, sans-serif; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};
const apiKey = process.env.NEXT_PUBLIC_EDITOR_KEY;
const Editor = ({
  initialValue,
  onEditorChange,
  name,
  label,
  isRequired,
  error,
  value,
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className={`text-para-base font-poppins font-semibold mb-[13px]`}
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <TinyMCEEditor
        apiKey={apiKey}
        initialValue={initialValue}
        init={editStyle}
        onEditorChange={onEditorChange}
        value={value}
      />
      {error && <p className="text-[12px] text-red-500 mt-1 ml-3">{error}</p>}
    </div>
  );
};

export default Editor;
