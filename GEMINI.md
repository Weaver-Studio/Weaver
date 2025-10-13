# Project Overview

This is a full-stack web application built with a modern tech stack. The frontend is built with React and Vite, styled with Tailwind CSS, and uses TanStack Router for routing. The backend is powered by Convex, and authentication is handled by WorkOS AuthKit.

## Key Technologies

*   **Frontend:**
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [Vite](https://vitejs.dev/): A fast build tool and development server for modern web projects.
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    *   [TanStack Router](https://tanstack.com/router/): A fully type-safe router for React.
*   **Backend:**
    *   [Convex](https://www.convex.dev/): A backend-as-a-service platform that provides a realtime database, serverless functions, and more.
*   **Authentication:**
    *   [WorkOS AuthKit](https://workos.com/authkit): A complete authentication solution that is easy to integrate and customize.

## Building and Running

To get the application running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    *   Copy the `.env.local.example` file to a new file named `.env.local`.
    *   Update the following variables in `.env.local` with your WorkOS and Convex credentials:
        *   `VITE_WORKOS_CLIENT_ID`
        *   `VITE_WORKOS_REDIRECT_URI`
        *   `VITE_CONVEX_URL`

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server and open the application in your default browser.

### Other available scripts:

*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Lint the code:**
    ```bash
    npm run lint
    ```
*   **Preview the production build:**
    ```bash
    npm run preview
    ```
*   **Format the code:**
    ```bash
    npm run format
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. It is recommended to use utility classes for styling whenever possible.
*   **Routing:** Routing is handled by TanStack Router. The routes are defined in the `src/routes` directory.
*   **State Management:** The project uses Convex for state management. The Convex client is initialized in `src/main.tsx`.
*   **Authentication:** Authentication is handled by WorkOS AuthKit. The AuthKitProvider is set up in `src/main.tsx`.
