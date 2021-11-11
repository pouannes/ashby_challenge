export type QuestionType =
  | "text"
  | "email"
  | "single-select"
  | "boolean"
  | "file";

// TODO: define the condition type
export type ConditionType = any;

export type Question = {
  id: number;
  form_section_id: number;
  type: QuestionType;
  title: string;
  description: string;
  display_order: number;
  is_required: boolean;
  condition: ConditionType;
  // TODO: intersect type with properties
  properties: any;
};
