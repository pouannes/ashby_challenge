import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Form } from "@/types/form";

const handler = async (req: NextApiRequest, res: NextApiResponse<Form[]>) => {
  const { body, method } = req;

  switch (method) {
    case "GET":
      const { data: form } = await supabase.from<Form>("forms").select();

      if (Array.isArray(form)) {
        res.status(200).json(form);
      }
      break;

    case "POST":
      const parsedBody = JSON.parse(body);
      const { title, description } = parsedBody;
      const { data: newForm, error } = await supabase
        .from<Form>("forms")
        .insert([{ title, description }]);

      if (!error && newForm !== null) {
        res.status(200).json(newForm);
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
