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

## Desired Features

- Set up auth on endpoints.
- Key store; separate DEV and PROD actions e.g. log error to console only in development.
