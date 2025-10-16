import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import path from "path"
import viteReact from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig(() => {
	return {
		server: ({
			allowedHosts: ['.test.com'],
			host: 'app.test.com',
			port: 5190,
		}),
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@convex': path.resolve(__dirname, './convex/convex'),
			},
		},
		envDir: path.resolve(__dirname, '../../'),
		plugins: [
			tsConfigPaths(),
			tanstackStart(),
			viteReact({
				babel: {
					plugins: [
						['babel-plugin-react-compiler', { /* optional configuration, e.g., target: '18' for React 18 */ }],
					],
				},
			}),

		],

	}
});
