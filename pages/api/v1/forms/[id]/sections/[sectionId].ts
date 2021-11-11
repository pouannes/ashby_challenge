import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Section } from "@/types/index";

const get = async (req: NextApiRequest, res: NextApiResponse<Section>) => {
  const {
    query: { sectionId },
  } = req;

  if (typeof sectionId !== "string") {
    return res.status(400).end("Form section not found");
  }

  const { data } = await supabase
    .from<Section>("form_sections")
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

  if (data !== null) {
    res.status(200).json(data);
  }

  res.status(404).end("Section not found");
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Section>) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await get(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
