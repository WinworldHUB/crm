import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type SimpleEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};

const FONT_HEADER_LIST = ["bold", "italic", "underline"];
const ORDER_HEADER_LIST = [{ list: "ordered" }, { list: "bullet" }];


const SimpleEditor: React.FC<SimpleEditorProps> = ({
  value = "",
  onChange,
}) => {
  const [content, setContent] = useState<string>(value);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
      modules={{
        toolbar: [FONT_HEADER_LIST, ORDER_HEADER_LIST],
      }}
      formats={["bold", "italic", "underline", "list", "bullet"]}
      theme="snow"
      className="w-full border border-gray-300 rounded-lg editor-text"
    />
  );
};

export default SimpleEditor;
