import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "es2020",
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        imprint: resolve(projectRoot, "imprint/index.html"),
        privacy: resolve(projectRoot, "privacy/index.html"),
      },
    },
  },
});
