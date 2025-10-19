# Weaver Mono-Repo

This is a monorepo for the Weaver project, a web application built with React, Vite, and Convex.

## Project Overview

The project is structured as a monorepo using pnpm workspaces and Turborepo. It consists of three separate frontend applications and a shared backend.

*   **Frontend Applications:**
    *   `apps/forum`: A forum application.
    *   `apps/studio`: A studio application.
    *   `apps/website`: A website application.

    All frontend applications are built with React and Vite. They use `@tanstack/react-router` for routing.

*   **Backend:**
    *   `packages/backend`: The backend is powered by [Convex](https://convex.dev/), a serverless backend platform.

*   **Shared Packages:**
    *   `packages/ui`: A shared UI component library.
    *   `packages/shared`: Shared utility functions.

## Building and Running

### Development

To run all applications in development mode, use the following command from the root of the project:

```bash
pnpm dev
```

To run a specific application in development mode, use the `--filter` flag:

```bash
pnpm dev --filter=@weaver/forum
pnpm dev --filter=@weaver/studio
pnpm dev --filter=@weaver/website
```

To run the backend in development mode, you can run its `dev` script directly:

```bash
cd packages/backend
pnpm dev
```

### Build

To build all applications for production, use the following command from the root of the project:

```bash
pnpm build
```

To build a specific application, use the `--filter` flag:

```bash
pnpm build --filter=@weaver/forum
pnpm build --filter=@weaver/studio
pnpm build --filter=@weaver/website
```

## Development Conventions

*   **Package Manager:** The project uses `pnpm` as the package manager.
*   **Monorepo Management:** The monorepo is managed with [Turborepo](https://turbo.build/).
*   **Linting:** The project uses ESLint for linting. To run the linter, use the following command:
    ```bash
    pnpm lint
    ```
*   **Formatting:** The project uses Prettier for code formatting. To format the code, use the following command:
    ```bash
    pnpm format
    ```
*   **Type Checking:** The project uses TypeScript for static type checking. To check for type errors, use the following command:
    ```bash
    pnpm check-types
    ```
