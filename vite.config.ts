import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [eslintPlugin(), tailwindcss(), vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
