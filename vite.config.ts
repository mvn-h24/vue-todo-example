import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@app/components": resolve(__dirname, "src/components"),
      "@app/types": resolve(__dirname, "src/types"),
    },
  },
});
