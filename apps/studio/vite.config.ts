import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import path from "path"
import viteReact from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig({

	server: ({
		allowedHosts: ['.test.com'],
		host: 'app.test.com',
		port: 5190,
	}),
	resolve: {
		alias: {
			"@studio/*": path.resolve(__dirname, "./src/*"),
			"@/*": path.resolve(__dirname, "./src/*"),
		}
	},
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
);
