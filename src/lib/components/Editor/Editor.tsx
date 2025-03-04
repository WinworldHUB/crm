import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type SimpleEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  onBlur: (e: any) => void;
};

const FONT_HEADER_LIST = ["bold", "italic", "underline"];
const ORDER_HEADER_LIST = [{ list: "ordered" }, { list: "bullet" }];


const Editor: React.FC<SimpleEditorProps> = ({
  value,
  onChange,
  onBlur
}) => {

  return (
    <ReactQuill
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      modules={{
        toolbar: [FONT_HEADER_LIST, ORDER_HEADER_LIST],
      }}
      formats={["bold", "italic", "underline", "list", "bullet"]}
      theme="snow"
      className="w-full border border-gray-300 rounded-lg editor-text"
    />
  );
};

export default Editor;
