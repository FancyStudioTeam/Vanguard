import './env.js';

import { env } from 'node:process';

import FastifyCookie from '@fastify/cookie';
import type { FastifyCorsOptions } from '@fastify/cors';
import FastifyCsrf from '@fastify/csrf-protection';
import FastifyHelmet from '@fastify/helmet';
import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';

import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { logger } from '#lib/Logger.js';
import { AppModule } from '#modules/App.module.js';

const { HOST, PORT } = env;

const APP_DEFAULT_PORT = 3_001;
const APP_DEFAULT_HOST = 'localhost';

const APP_HOST = HOST ?? APP_DEFAULT_HOST;
const APP_PORT = PORT ?? APP_DEFAULT_PORT;

const APP_ADAPTER = new FastifyAdapter();
const APP_MODULE = AppModule;

const APP_OPTIONS: NestApplicationOptions = {
	logger: [
		'error',
		'fatal',
	],
};

const CORS_OPTIONS: FastifyCorsOptions = {
	credentials: true,
	methods: [
		'DELETE',
		'GET',
		'PATCH',
		'POST',
		'PUT',
	],
	origin: [
		BASE_DASHBOARD_URL,
	],
};

const app = await NestFactory.create<NestFastifyApplication>(APP_MODULE, APP_ADAPTER, APP_OPTIONS);

app.enableCors(CORS_OPTIONS);
app.setGlobalPrefix('api');

await app.register(FastifyCookie);
await app.register(FastifyCsrf);
await app.register(FastifyHelmet);

await app
	.listen(APP_PORT, APP_HOST)
	.then(async () => logger.info(`Listening on address '${await app.getUrl()}'`));

declare module 'fastify' {
	interface FastifyRequest {
		sessionId: string;
		sessionUserId: string;
	}
}
