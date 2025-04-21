import { WorkerEntrypoint } from 'cloudflare:workers';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';

export default class extends WorkerEntrypoint<AuthEnv> {
	private database: DrizzleD1Database;

	constructor(ctx: ExecutionContext, env: AuthEnv) {
		super(ctx, env);

		this.database = drizzle(this.env.DB_AUTH);
	}

	async fetch() {
		return new Response('Hello from Auth service!');
	}
}
