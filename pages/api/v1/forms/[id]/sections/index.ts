import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Section, Form } from "@/types/index";

const get = async (req: NextApiRequest, res: NextApiResponse<Section[]>) => {
  const {
    query: { id },
  } = req;

  if (typeof id !== "string") {
    return res.status(400).end("Form not found");
  }

  const { data: section } = await supabase
    .from<Section>("form_sections")
    .select()
    .eq("form_id", id);

  if (Array.isArray(section)) {
    return res.status(200).json(section);
  }
};

const post = async (req: NextApiRequest, res: NextApiResponse<Section[]>) => {
  const { body } = req;

  const parsedBody = JSON.parse(body);
  const { title, description, formId } = parsedBody;

  const { data: form, error: formError } = await supabase
    .from<Form>("forms")
    .select()
    .eq("id", formId)
    .single();

  if (formError) {
    res.status(400).end(`Form with id ${formId} wasn't found.`);
  }

  const { data: formSections, error: formSectionsError } = await supabase
    .from<Section>("form_sections")
    .select("id, display_order")
    .eq("form_id", formId);

  // automatically choose the right displayOrder based on existing sections;
  let displayOrder = 0;
  if (formSections && formSections?.length > 0) {
    displayOrder =
      formSections.map(({ display_order }) => display_order).sort()[
        formSections.length - 1
      ] + 1;
  }

  const { data: newSection, error } = await supabase
    .from<Section>("form_sections")
    .insert([
      { title, description, form_id: formId, display_order: displayOrder },
    ]);

  if (!error && newSection !== null) {
    res.status(200).json(newSection);
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Section[]>
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await get(req, res);
      break;

    case "POST":
      await post(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
