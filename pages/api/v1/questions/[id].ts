import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Question } from "@/types/index";

const get = async (req: NextApiRequest, res: NextApiResponse<Question>) => {
  const {
    query: { id },
  } = req;

  if (typeof id !== "string") {
    return res.status(400).end("Invalid request");
  }

  const { data } = await supabase
    .from<Question>("form_questions")
    .select()
    .eq("id", id)
    .single();

  if (data !== null) {
    return res.status(200).json(data);
  }

  return res.status(404).end("Question not found");
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Question>) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await get(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
