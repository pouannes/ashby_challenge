import React from "react";

type QuestionProps = {
  title: string;
  description?: string;
};

const Question = ({ title, description }: QuestionProps) => {
  return (
    <div className="flex flex-col items-start my-10">
      <p className="mb-3 text-xl dark:text-gray-200">{title}</p>
      {description ? (
        <p className="text-sm dark:text-gray-300">{description}</p>
      ) : null}
    </div>
  );
};

export default Question;
