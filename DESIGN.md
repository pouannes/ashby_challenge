Hi there,

This file documents the design decisions in this project.

## Tech Stack used

For this project, I used postgresql for the database (hosted on Supabase), and express.js for the API. I choose to host the express server together with a thin presentation layer written in next.js/React. This allows me to very easily spin up an API and a front-end and test things as I build them.

## General considerations

### No utility columns

I omitted generic columns that can be useful but aren't relevant to this exercise in particular, such as `created_at`, `updated_at`, etc.

### No reuse of questions

The database is designed in such a way that questions can't be re-used between forms: a `FormQuestion` belongs to a single `FormSection` which in turns belongs to a single `Form`.

This is made expecting that each form created will be quite different from the others, and the user won't want to often re-use questions from previous forms. Re-use is still possible by copying questions from other forms, but that's it.

If re-using form questions is important, we might want to change this decision and normalize form questions.

## Form Sections

Instead of just having the hiearchy `Form > FormQuestions`, I choose to group questions together in Sections: `Form > FormSections > FormQuestions`. This is not necessarily needed, and can be easily abstracted away by the front-end in this case.

However, this is quite a common feature to want in forms, and could be a bit of a pain to add later on.
