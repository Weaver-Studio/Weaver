// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	server: {
		host: "test.com",
		port: 5170,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart(),
		// react's vite plugin must come after start's vite plugin
		viteReact({
			babel: {
				plugins: [
					['babel-plugin-react-compiler', { /* optional configuration, e.g., target: '18' for React 18 */ }],
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@convex': path.resolve(__dirname, './convex/convex'),
		},
	},
})