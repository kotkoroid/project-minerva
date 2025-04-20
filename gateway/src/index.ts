import { Hono } from 'hono';

// TODO: https://github.com/cloudflare/workers-sdk/issues/8902
interface GatewayRpcEnv extends GatewayEnv {
	AUTH_SERVICE: Service<import('@minerva/auth/src/index').default>;
}

const app = new Hono<{ Bindings: GatewayRpcEnv }>();

app.get('/', async (c) => {
	return c.text('Hello Hono!');
});

export default app;
