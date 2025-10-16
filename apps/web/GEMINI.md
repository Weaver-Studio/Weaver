# Project Overview

This is a full-stack web application built with the T3 stack:

*   **TypeScript:** For static typing and improved developer experience.
*   **TanStack:** Utilizes TanStack Router for client-side routing and TanStack Query for data fetching and state management.
*   **Tailwind CSS:** For utility-first CSS styling.
*   **Vite:** As the build tool and development server.
*   **Convex:** As the backend for data persistence and serverless functions.

The project is structured as a modern single-page application (SPA) with a clear separation of concerns between the frontend and backend.

## Building and Running

**Installation:**

```bash
bun install
```

**Running the development server:**

```bash
bun run dev
```

**Building for production:**

```bash
bun run build
```

## Development Conventions

*   **Components:** Reusable UI components are located in `src/components`.
*   **Routing:** The application's routes are defined in `src/routes` and managed by TanStack Router.
*   **Data Model:** The Convex database schema is defined in `convex/convex/schema.ts`.
*   **Styling:** Tailwind CSS is used for styling, with custom styles in `src/styles/app.css`.
