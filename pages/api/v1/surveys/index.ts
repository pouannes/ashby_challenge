import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Survey } from "@/types/index";

const get = async (res: NextApiResponse<Survey[]>) => {
  const { data: survey } = await supabase.from<Survey>("survey").select();

  if (!Array.isArray(survey)) {
    return res.status(500).end("Something went wrong");
  }

  return res.status(200).json(survey);
};

const post = async (req: NextApiRequest, res: NextApiResponse<Survey[]>) => {
  const { body } = req;

  const parsedBody = JSON.parse(body);
  const { formId, userId } = parsedBody;

  const { data: newForm, error } = await supabase
    .from<Survey>("survey")
    .insert([{ form_id: formId, user_id: userId }]);

  if (error || newForm === null) {
    return res.status(500).end("Something went wrong");
  }

  return res.status(200).json(newForm);
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Survey[]>) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await get(res);
      break;

    case "POST":
      await post(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
