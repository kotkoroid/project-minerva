import { WorkerEntrypoint } from 'cloudflare:workers';
import { randomUUID } from 'node:crypto';
import * as schema from '@minerva/auth/src/database/schema';
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '@minerva/auth/src/utils/database/user';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';

// TODO: https://github.com/cloudflare/workers-sdk/issues/9229
export interface Env {
	DB_AUTH: D1Database;
}

export default class extends WorkerEntrypoint {
 	async fetch() {
		return new Response('Auth service is up and running. kthxbye');
	}
}

export class AuthService extends WorkerEntrypoint {
	private database: DrizzleD1Database<typeof schema>;

	constructor(ctx: ExecutionContext, env: Env) {
		super(ctx, env);

		this.database = drizzle(env.DB_AUTH);
	}

	async checkEmailAvailability({ email }: { email: string }) {
		const user = await getUserByEmail(this.database, email);

		return !!user;
	}

	async checkUsernameAvailability({ username }: { username: string }) {
		const user = await getUserByUsername(this.database, username);

		return !!user;
	}

	async createUser({ username, email }: { username: string; email: string }) {
		const user = await createUser(this.database, {
			id: randomUUID(),
			createdAt: new Date(),
			username,
			email,
			password: randomUUID(),
			salt: randomUUID(),
			status: 'UNVERIFIED',
		});

		return user;
	}
}
