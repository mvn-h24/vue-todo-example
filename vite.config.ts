import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@app/components": resolve(__dirname, "src/components"),
      "@app/store": resolve(__dirname, "src/store"),
      "@app/types": resolve(__dirname, "src/types"),
      "@app": resolve(__dirname, "src/composable"),
    },
  },
});
