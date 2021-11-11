export type TextQuestion = {
  type: "text";
  properties: null;
  value: string;
};

export type EmailQuestion = {
  type: "email";
  properties: null;
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
  properties: null;
  value: boolean;
};

export type FileQuestion = {
  type: "file";
  // URL of the file
  properties: null;
  value: string;
};
