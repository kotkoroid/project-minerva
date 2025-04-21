import { Hono } from 'hono';

// TODO: https://github.com/cloudflare/workers-sdk/issues/8902
interface GatewayRpcEnv extends GatewayEnv {
	AUTH_SERVICE: Service<import('@minerva/auth/src/index').default>;
}

const app = new Hono<{ Bindings: GatewayRpcEnv }>();

app.get('/', async (c) => {
	return c.text('API is up and running. kthxbye');
});

app.post('/users', async (c) => {
	const body = await c.req.json();

	const { username, email } = body;

	const existingUserByEmail = await c.env.AUTH_SERVICE.checkEmailAvailability({
		email,
	});

	if (existingUserByEmail) {
		return c.text('This email address is already taken.', 409);
	}

	const existingUserByUsername =
		await c.env.AUTH_SERVICE.checkUsernameAvailability({
			username,
		});

	if (existingUserByUsername) {
		return c.text('This username is already taken.', 409);
	}

	await c.env.AUTH_SERVICE.createUser({
		username,
		email,
	});

	return c.text('User was successfully registered.', 200);
});

export default app;
