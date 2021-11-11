export type Answer = {
  id: number;
  survey_id: number;
  form_question_id: number;
  // This type is all the possible types in
  // `questionTypes`. There's probably a better way to type this,
  // but I don't know it. Left as a TODO
  value: string | boolean;
};
