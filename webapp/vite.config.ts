import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@auth": path.resolve(__dirname, "./src/auth"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@screens": path.resolve(__dirname, "./src/screens"),
      "@components": path.resolve(__dirname, "./src/components")
    }
  }
});

