import { Question } from "./question";

export type Section = {
  id: number;
  form_id: number;
  title: string;
  description: string;
  display_order: number;
};

export type SectionWithQuestions = Section & { form_questions: Question[] };
