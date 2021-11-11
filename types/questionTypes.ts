export type TextQuestion = {
  type: "text";
  value: string;
};

export type EmailQuestion = {
  type: "email";
  value: string;
};

export type SingleSelectQuestion = {
  type: "single_select";
  value: string;
  properties: {
    options: string[];
  };
};

export type BooleanQuestion = {
  type: "boolean";
  value: boolean;
};

export type FileQuestion = {
  type: "file";
  // URL of the file
  value: string;
};
