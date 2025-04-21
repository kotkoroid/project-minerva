/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'minerva',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'cloudflare',
		};
	},
	async run() {
		// Auth D1
		new sst.cloudflare.D1('authD1', {
			transform: {
				database: {
					name: 'auth-d1',
				},
			},
		});
	},
});
