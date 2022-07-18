import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import importToCDN from "vite-plugin-cdn-import";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
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
	plugins: [
		vue(),
		viteCompression({
			//生成压缩包gz
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: "gzip",
			ext: ".gz",
		}),
		// 配置CDN
		importToCDN({
			modules: [
				{
					name: "vue",
					var: "Vue",
					path: "https://unpkg.com/vue@next",
				},
				{
					name: "vuex",
					var: "Vuex",
					path: "https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js",
				},
				{
					name: "vue-router",
					var: "VueRouter",
					path: "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.12/vue-router.global.prod.min.js",
				},
				{
					name: "element-plus",
					var: "ElementPlus",
					path: `https://unpkg.com/element-plus`,
					css: "https://unpkg.com/element-plus/dist/index.css",
				},
			],
		}),
	],
	build: {
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
		// 取消计算文件大小，加快打包速度
		reportCompressedSize: false,
		sourcemap: true,
		// assetsDir: 'static/img',
		rollupOptions: {
			output: {
				chunkFileNames: "js/[name]-[hash].js",
				entryFileNames: "js/[name]-[hash].js",
				assetFileNames: "[ext]/[name]-[hash].[ext]",
			},
		},
	},
	server: {
		proxy: {
			"/ws": {
				target: "https://apis.map.qq.com",
			},
		},
		open: true,
		port: 6688,
	},
});
