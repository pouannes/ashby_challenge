import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Form } from "@/types/form";

const get = async (res: NextApiResponse<Form[]>) => {
  const { data: form } = await supabase.from<Form>("forms").select();

  if (!Array.isArray(form)) {
    return res.status(500).end("Something went wrong");
  }

  return res.status(200).json(form);
};

const post = async (req: NextApiRequest, res: NextApiResponse<Form[]>) => {
  const { body } = req;

  const parsedBody = JSON.parse(body);
  const { title, description } = parsedBody;

  const { data: newForm, error } = await supabase
    .from<Form>("forms")
    .insert([{ title, description }]);

  if (error || newForm === null) {
    return res.status(500).end("Something went wrong");
  }

  return res.status(200).json(newForm);
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Form[]>) => {
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
