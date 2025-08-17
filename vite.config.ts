import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => ({
  base: "/",
  build: { outDir: "dist", emptyOutDir: true },
  server: { host: "0.0.0.0", port: 8080 },
  plugins: [react()],              // ← only this
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
}));
