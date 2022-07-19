import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    extensions: [".js", ".vue", ".json", "scss", ".ts"],
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "vites",
        replacement: path.resolve(__dirname, "src/view"),
      },
    ],
  },
  plugins: [vue()],
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 3000, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:4000", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
