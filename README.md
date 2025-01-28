# Node Movie API

## Introduction

This was my first go at creating a REST API, with a sprinkle of CQS, using Node.js. It is a simple API with endpoints to manage movies.

## Features

- You can create, edit, replace, get and delete movies.
- The API is using TypeScript.
- We interact with a real Postgres DB, using Knex.
- We use `express-async-errors` to avoid the server crashing when errors are thrown in the async route functions.
- CORs package is included to allow other systems to call the API e.g. a frontend Angular app.
- Our validation on endpoint commands is handled by `zod`.

### Database

We connect to a Postgres database using Knex.

Knex allows us to simple query language vs manually written SQL queries.

#### Migrations

To manage our database we use migrations and run them via Knex. Here we define the changes in code, and then knex will convert that to SQL that will create/update our database model.

We make the choice to not run migrations programmatically, but to assume the database is set up in our environment, and that the migrations will be run as part of a CI/CD step.

There are a few commands in the `package.json` file that can help.

To create a migration file:
```(node)
npm run db:migrate:make <migration-name>
```

To apply any or all migrations:
```(node)
npm run db:migrate
```


## Desired Features

- Set up auth on endpoints.
- Key store; separate DEV and PROD actions e.g. log error to console only in development.
