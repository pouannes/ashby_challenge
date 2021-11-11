import React from "react";
import Button, { ButtonProps } from "./Button";

const AddQuestionButton = (props: ButtonProps) => {
  return (
    <div className="flex items-center w-full mt-20">
      <span className="flex-grow h-px bg-gray-500" />
      <Button {...props}>Add question</Button>
      <span className="flex-grow h-px bg-gray-500" />
    </div>
  );
};

export default AddQuestionButton;
