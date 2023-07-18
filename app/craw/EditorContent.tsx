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
    if (newvalue.includes("**")) {
      newvalue = newvalue.replace(/\*/g, "");
    }
    newvalue = newvalue.replace(/&lt;/g, "<");
    newvalue = newvalue.replace(/&gt;/g, ">");
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
