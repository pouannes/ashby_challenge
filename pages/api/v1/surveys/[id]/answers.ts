import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Answer, Form } from "@/types/index";

const post = async (req: NextApiRequest, res: NextApiResponse<Answer[]>) => {
  const { body } = req;

  const parsedBody = JSON.parse(body);
  const { surveyId, formQuestionId, value } = parsedBody;

  const { error: surveyError } = await supabase
    .from<Form>("surveys")
    .select("id")
    .eq("id", surveyId)
    .single();

  if (surveyError) {
    return res.status(400).end(`Survey with id ${surveyId} wasn't found.`);
  }

  const { error: formError } = await supabase
    .from<Form>("form_questions")
    .select("id")
    .eq("id", formQuestionId)
    .single();

  if (formError) {
    return res
      .status(400)
      .end(`Question with id ${formQuestionId} wasn't found.`);
  }

  const { data: newAnswer, error } = await supabase
    .from<Answer>("survey_answers")
    .insert([
      { survey_id: surveyId, form_question_id: formQuestionId, value: value },
    ]);

  if (error || newAnswer === null) {
    return res.status(500).end("Something went wrong");
  }

  return res.status(200).json(newAnswer);
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Answer[]>) => {
  const { method } = req;

  switch (method) {
    case "POST":
      await post(req, res);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
