import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint<AuthEnv> {
	async fetch() {
		return new Response('Hello from Auth service!');
	}
}
