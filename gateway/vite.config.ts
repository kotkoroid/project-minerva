import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		// TODO: https://github.com/cloudflare/workers-sdk/issues/8963
		cloudflare({
			auxiliaryWorkers: [{ configPath: '../services/auth/wrangler.jsonc' }],
			persistState: {
				path: '../services/auth/.wrangler/state',
			},
		}),
	],
});
