import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Form } from "@/types/form";

const get = async (req: NextApiRequest, res: NextApiResponse<Form>) => {
  const {
    query: { id },
  } = req;

  if (typeof id === "string") {
    const { data } = await supabase
      .from<Form>("forms")
      // TODO: add the form sections too
      .select(
        `
        *,
        form_sections (
          *
        )
      `
      )
      .eq("id", id)
      .single();

    if (data !== null) {
      return res.status(200).json(data);
    }

    res.status(404).end("Form not found");
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Form>) => {
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
