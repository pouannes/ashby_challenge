import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Form, Section } from "@/types/index";

type FormWithSections = Form & { form_sections: Section[] };

const get = async (
  req: NextApiRequest,
  res: NextApiResponse<FormWithSections>
) => {
  const {
    query: { id },
  } = req;

  if (typeof id === "string") {
    const { data } = await supabase
      .from<FormWithSections>("forms")
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

    if (data === null) {
      return res.status(404).end("Form not found");
    }

    return res.status(200).json(data);
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FormWithSections>
) => {
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
