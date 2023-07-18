import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

interface EditorContentProps {
  text: string;
  setText: (value: string) => void;
}
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["link", "image"],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const moduleOptions = {
  toolbar: toolbarOptions,
};

const EditorContent: React.FC<EditorContentProps> = ({ text, setText }) => {
  const handleChange = (value: string) => {
    let newvalue = value;
    if (newvalue.includes("*")) {
      newvalue = newvalue.replace(/\*/g, "");
    }
    if (newvalue.includes("image")) {
      newvalue = newvalue.replace(
        /linkimage(.*?)linkimage/g,
        '<figure class="flex items-center flex-col justify-center "><img width="300" height="150" src="$1" class="sm:max-w-[600px] max-w-full sm:w-auto w-full h-auto object-cover" alt="Ảnh mô tả" /><figcaption class="text-center text-sm my-2 opacity-70">Ảnh minh họa</figcaption></figure>'
      );
    }

    setText(newvalue);
  };
  return (
    <div id="blog_page-detail">
      <ReactQuill
        modules={moduleOptions}
        theme="snow"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditorContent;
