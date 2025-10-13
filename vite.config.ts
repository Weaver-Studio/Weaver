import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

	const env = loadEnv(mode, process.cwd(), '')


	return {
		server: ({
			allowedHosts: ['.test.com'],
			host: 'app.test.com',
			port: Number(env.VITE_PORT),
		}),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
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

	}
});
