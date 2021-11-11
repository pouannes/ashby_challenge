Hey there,

This file documents the design decisions in this project.

## Tech Stack used

For this project, I used postgresql for the database (hosted on Supabase), and express.js for the API. I choose to host the express server together with a thin presentation layer written in next.js/React. This allows me to very easily spin up an API and a front-end and test things as I build them.

## Architecture

The API follows the REST architecture. An overview of the available calls is available in the README.

### Forms

A Form is a questionnaire. Each form contains one or more sections, and each section contains 0 or more questions.

`Form > FormSections > FormQuestions`

### Surveys

A survey is created when someone answers a form. The survey contains answers.

`Survey > Answers`

## General considerations

### No reuse of questions

The database is designed in such a way that questions can't be re-used between forms: a `FormQuestion` belongs to a single `FormSection` which in turns belongs to a single `Form`.

This is made expecting that each form created will be quite different from the others, and the user won't want to often re-use questions from previous forms. Re-use is still possible by copying questions from other forms, but that's it.

If re-using form questions is important, we might want to change this decision and normalize form questions.

### Form Sections

Instead of just having the hierarchy `Form > FormQuestions`, I choose to group questions together in Sections: `Form > FormSections > FormQuestions`. This is not necessarily needed, and can be easily abstracted away by the front-end in this case.

However, this is quite a common feature to want in forms, and could be a bit of a pain to add later on. Therefore, I traded a bit of simplicity for the flexibility it gives for the future.

If we are sure that our forms won't need sections/pages, we can do away with sections.

### Conditional questions

A question is made conditional on another field's value by specifying its `condition` property, with the following syntax:

`[questionId, '=', value]`

where:

- `questionId` is the ID of the other question whose value will be used for the condition
- `value` is the value for the condition to be true

e.g. `condition: [123, '=', 'foobar']` means that the question will only be visible if the answer to the previous question with id `123` is `'foobar'`.

This format might seem odd, but I choose it because it's very easily extensible. For example, if we want to be able to compare values rather than just check for equality, the format can be easily adapted:

`[questionId, '>', value]`

This format can be easily extended into quite complex conditions if necessary. For example:

```
[
  'any',
  [question1, '=', '1']
  [question2, '=', '2']
]
```

This might mean "only show this question if either `question1` has value 1, or `question2` has value 2.

This format was inspired by [Mapbox's expressions for computing values of properties](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/).

### No utility columns

I omitted generic columns that can be useful but aren't relevant to this exercise in particular, such as `created_at`, `updated_at`, etc.

### No significant error handling or parameter validation

Error handling and parameter validation were kept pretty minimal in the code, because it's usually handled through global utilities that I didn't implement here.

### No authentication / user handling

Authentication and handling object ownership was also kept minimal in the code. It was only included in:

- The `Form` object, to know who the author of the form is.
- The `Survey` object, to know who answered the form.
