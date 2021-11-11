import React from "react";

interface TextFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const TextField = ({
  value,
  handleChange,
  name,
  ...inputProps
}: TextFieldProps) => {
  return (
    <div className="mb-6 md:flex md:items-center">
      <div className="md:w-1/3">
        <label
          className="block pr-4 mb-1 font-bold text-gray-500 dark:text-gray-300 md:text-right md:mb-0"
          htmlFor={name}
        >
          {name}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id={name}
          type="text"
          value={value}
          onChange={handleChange}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default TextField;
