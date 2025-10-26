// vite.config.ts

import path from "node:path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "test.com",
    port: 5170,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              /* optional configuration, e.g., target: '18' for React 18 */
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@website/*": path.resolve(__dirname, "./src/*"),
    },
  },
});
