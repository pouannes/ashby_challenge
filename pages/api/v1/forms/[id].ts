import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";
import { Form } from "@/types/form";

const handler = async (req: NextApiRequest, res: NextApiResponse<Form>) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      if (typeof id === "string") {
        const { data } = await supabase
          .from<Form>("forms")
          .select()
          .eq("id", id)
          .single();
        if (data !== null) {
          res.status(200).json(data);
        }
        break;
      }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
