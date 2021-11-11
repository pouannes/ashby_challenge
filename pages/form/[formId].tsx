import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

import { Form, Question, Section, SectionWithQuestions } from "@/types/index";
import AddQuestionButton from "@/components/AddQuestionButton";
import NewQuestionDialog from "@/components/NewQuestionDialog";
import QuestionDisplay from "@/components/Question";

type FormPageProps = {
  form: Form;
  sectionId: string;
  questions: Question[];
};

const FormPage: NextPage<FormPageProps> = ({
  form,
  sectionId,
  questions: existingQuestions,
}) => {
  const [newQuestionOpen, setNewQuestionOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState(existingQuestions);

  const createNewQuestion = async (title: string, description: string) => {
    const body = {
      title,
      description,
      type: "text",
      sectionId,
    };

    const newQuestions: Question[] = await fetch(`/api/v1/questions`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));

    setQuestions((prevQuestions) =>
      !!prevQuestions ? [...prevQuestions, ...newQuestions] : newQuestions
    );
  };

  return (
    <div>
      <Head>
        <title>{form.title} </title>
        <meta
          name="description"
          content={form.description ?? "Form made with Ashby"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen dark:bg-gray-950">
        <div className="w-full px-8 py-6 pt-10 mx-6 mx-auto border border-b-0 border-gray-700 mt-14 dark:bg-gray-900 rounded-t-3xl max-w-7xl">
          <header className="flex items-center justify-between w-full mb-10">
            <h1 className="text-3xl">{form.title}</h1>
          </header>
          {questions?.length > 0
            ? questions.map(({ title, description }) => (
                <QuestionDisplay
                  title={title}
                  description={description}
                  key={title}
                />
              ))
            : null}
          {/* {forms !== null ? <FormList forms={forms} /> : null} */}

          <AddQuestionButton onClick={() => setNewQuestionOpen(true)} />
        </div>
        <NewQuestionDialog
          open={newQuestionOpen}
          setOpen={setNewQuestionOpen}
          createNewQuestion={createNewQuestion}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { formId } = context.params as { formId: string };

  console.log(process.env.NODE_ENV);

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ashby-challenge.vercel.app";

  const form: Form = await fetch(`${url}/api/v1/forms/${formId}`).then((res) =>
    res.json()
  );
  const sections: Section[] = await fetch(
    `${url}/api/v1/forms/${formId}/sections`
  ).then((res) => res.json());

  let sectionId;
  let questions: Question[] = [];

  // if this is a new form with no question, create a first section
  if (sections.length === 0) {
    const newSection: Section = await fetch(
      `${url}/api/v1/forms/${formId}/sections`,
      {
        method: "post",
        body: JSON.stringify({
          title: "New section",
          formId,
        }),
      }
    ).then((res) => res.json());
    sectionId = newSection.id;
  } else {
    // retrieve existing questions for the first section of this form
    const firstSection: SectionWithQuestions = await fetch(
      `${url}/api/v1/forms/${formId}/sections/${sections[0].id}`
    ).then((res) => res.json());

    questions = firstSection.form_questions;

    sectionId = sections[0].id;
  }

  return {
    props: {
      form,
      sectionId,
      questions,
    },
  };
};

export default FormPage;
