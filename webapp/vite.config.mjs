import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@auth": path.resolve(__dirname, "src/auth"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@context": path.resolve(__dirname, "src/context"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils")
    }
  },
  build: {
    outDir: "dist"
  }
});

