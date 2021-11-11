import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Section, Question } from "@/types/index";

type SectionWithQuestions = Section & { form_questions: Question[] };

const post = async (req: NextApiRequest, res: NextApiResponse<Question[]>) => {
  const { body } = req;

  const parsedBody = JSON.parse(body);
  const {
    title,
    description,
    type,
    sectionId,
    isRequired = false,
    condition = null,
    properties = null,
  } = parsedBody;

  const { data: section, error: sectionError } = await supabase
    .from<SectionWithQuestions>("form_sections")
    .select(
      `
    *,
    form_questions (
      *
    )
  `
    )
    .eq("id", sectionId)
    .single();

  if (sectionError || section === null) {
    return res
      .status(404)
      .end(`Form section with id ${sectionId} wasn't found.`);
  }

  // automatically choose the right displayOrder based on existing questions;
  let displayOrder = 0;
  if (section.form_questions && section.form_questions?.length > 0) {
    displayOrder =
      section.form_questions.map(({ display_order }) => display_order).sort()[
        section.form_questions.length - 1
      ] + 1;
  }

  const { data: newQuestion, error } = await supabase
    .from<Question>("form_questions")
    .insert([
      {
        title,
        description,
        type,
        is_required: isRequired,
        condition,
        properties,
        form_section_id: sectionId,
        display_order: displayOrder,
      },
    ]);

  if (error || newQuestion === null) {
    return res.status(400).end("Something went wrong");
  }

  return res.status(200).json(newQuestion);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Question[]>
) => {
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
