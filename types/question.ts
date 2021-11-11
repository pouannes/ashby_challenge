import {
  TextQuestion,
  EmailQuestion,
  SingleSelectQuestion,
  BooleanQuestion,
  FileQuestion,
} from "./questionTypes";
import { Condition } from "./condition";

type AllQuestionTypes =
  | TextQuestion
  | EmailQuestion
  | Omit<SingleSelectQuestion, "properties">
  | BooleanQuestion
  | FileQuestion;

export type Question = AllQuestionTypes & {
  id: number;
  form_section_id: number;
  title: string;
  description: string;
  display_order: number;
  is_required: boolean;
  condition: Condition;
};
