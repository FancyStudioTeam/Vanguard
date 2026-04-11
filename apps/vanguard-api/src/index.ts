import './env.js';

import FastifyCookie from '@fastify/cookie';
import FastifySecureSession, { type SecureSessionPluginOptions } from '@fastify/secure-session';
import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import {
	COOKIE_SALT,
	COOKIE_SECRET,
	COOKIE_SESSION_DATA_DOMAIN,
	COOKIE_SESSION_DATA_MAX_AGE,
	COOKIE_SESSION_DATA_NAME,
} from '#lib/Constants/Cookies.js';
import { logger } from '#lib/Logger.js';
import { AppModule } from '#modules/App.module.js';

const APP_PORT = 3001;

const APP_ADAPTER = new FastifyAdapter();
const APP_MODULE = AppModule;
const APP_OPTIONS: NestApplicationOptions = {
	logger: [
		'error',
		'fatal',
	],
};

const SECURE_SESSION_OPTIONS: SecureSessionPluginOptions = {
	cookie: {
		domain: COOKIE_SESSION_DATA_DOMAIN,
		httpOnly: true,
		maxAge: COOKIE_SESSION_DATA_MAX_AGE,
		path: '/',
		sameSite: 'lax',
		secure: true,
	},
	cookieName: COOKIE_SESSION_DATA_NAME,
	salt: COOKIE_SALT,
	secret: COOKIE_SECRET,
};

const app = await NestFactory.create<NestFastifyApplication>(APP_MODULE, APP_ADAPTER, APP_OPTIONS);

app.enableCors();

await app.register(FastifyCookie);
await app.register(FastifySecureSession, SECURE_SESSION_OPTIONS);

await app.listen(APP_PORT, '0.0.0.0').then((data) => {
	let address = data.address();

	if (typeof address === 'object' && address !== null) {
		const { address: host, port } = address;

		address = `http://${host}:${port}`;
	}

	logger.info(`Listening on address '${address}'`);
});
