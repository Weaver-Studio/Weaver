# Project Overview

This is a [Convex](https://convex.dev/) backend project built with [TypeScript](https://www.typescriptlang.org/). It uses [ESLint](https://eslint.org/) for code linting and `@convex-dev/better-auth` for authentication. The project is set up with a basic schema and some example functions.

## Building and Running

### Prerequisites

*   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
*   [Convex CLI](https://docs.convex.dev/cli)

### Running the development server

To start the development server, run the following command:

```sh
npm run dev
```

This will start the Convex development server and open the Convex dashboard in your browser.

### Running tests

There are no explicit test commands in the `package.json` file. However, you can run the linter to check for code quality:

```sh
npm run lint
```

## Development Conventions

### Code Style

The project uses ESLint to enforce a consistent code style. The ESLint configuration can be found in the `eslint.config.mjs` file.

### Authentication

The project uses `@convex-dev/better-auth` for authentication. The authentication configuration can be found in `convex/auth.config.ts`.

### Database

The database schema is defined in `convex/schema.ts`. The project uses the Convex database, and the schema is defined using the `defineSchema` and `defineTable` functions.

### HTTP API

The project exposes an HTTP API using the `convex/http.ts` file. The API is configured to handle CORS requests.
