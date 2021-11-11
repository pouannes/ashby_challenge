This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## API endpoints implemented

### v1/forms

- **GET**: List all forms
- **POST**: Create a new form

### v1/forms/:id

- **GET**: Retrieves form with id `id`

### v1/forms/:id/sections

- **GET**: List all sections of form with id `id`
- **POST**: Create a new section for form with id `id`

### v1/forms/:id/sections/:sectionId

- **GET**: Retrieves section with id `sectionId` of form with id `id`, along with all of its associated questions

### v1/questions

- **GET**: Retrieves questions for a specific section
- **POST**: Create a new question

### v1/questions/:id

- **GET**: Retrieve question with id `id`

### v1/surveys

- **GET**: List all surveys for a specific form
- **POST**: Create a new survey for a specific form

### v1/surveys/:id

- **GET**: List all answers for the survey with id `id`
- **POST**: Create a new answer for the survey with id `id`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
