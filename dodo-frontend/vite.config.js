import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 build: {
  sourcemap: true,
 },
 base: "/",
 plugins: [react()],
 preview: {
  port: 3000,
  strictPort: true,
 },
 server: {
  port: 3000,
  strictPort: true,
  host: "0.0.0.0",
  origin: "http://0.0.0.0:3000",
 },
});