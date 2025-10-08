import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

	const env = loadEnv(mode, process.cwd(), '')


	return {
		server: ({
			allowedHosts: ['.test'],
			host: 'app.test',
			port: Number(env.VITE_PORT),
		}),
		plugins: [
			tanstackRouter({
				target: 'react',
				autoCodeSplitting: true,
			}),
			react({
				babel: {
					plugins: [
						['babel-plugin-react-compiler', { /* optional configuration, e.g., target: '18' for React 18 */ }],
					],
				},
			}),
			tailwindcss(),

		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	}
});
