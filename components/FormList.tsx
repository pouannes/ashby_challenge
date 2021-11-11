import { Form } from "@/types/form";
import Link from "next/link";

type Props = {
  forms: Form[];
};

const FormList = ({ forms }: Props) => {
  const spacing = "px-6 py-3";
  return (
    <table className="min-w-full border border-separate rounded-lg divide-none dark:border-gray-700">
      <thead className="text-sm font-light tracking-wider dark:bg-gray-700 ">
        <tr className="text-left uppercase ">
          <th className={`${spacing} rounded-tl-lg`}>Form</th>
          <th className={spacing}>Description</th>
          <th className={spacing}></th>
          <th className={`${spacing} rounded-tr-lg`}></th>
        </tr>
      </thead>
      <tbody>
        {forms.map((course, index) => (
          <tr
            key={course.id}
            className={`${
              index % 2 === 0 ? "dark:bg-gray-800" : "dark:bg-gray-790"
            }`}
          >
            <td
              className={`${spacing} ${
                index === forms.length - 1 ? "rounded-bl-lg" : ""
              }`}
            >
              {course.title}
            </td>
            <td className={spacing}> {course.description}</td>
            <td className={spacing}>
              <Link href="/">
                <a className="dark:text-blue-500 hover:underline">View</a>
              </Link>
            </td>
            <td
              className={`${spacing} ${
                index === forms.length - 1 ? "rounded-br-lg" : ""
              }`}
            >
              <Link href={`/${course.id}`}>
                <a className="dark:text-blue-500 hover:underline">Edit</a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormList;
