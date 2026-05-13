import './env.js';

import { env } from 'node:process';

import FastifyCookie from '@fastify/cookie';
import FastifySecureSession, { type SecureSessionPluginOptions } from '@fastify/secure-session';
import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';

import { COOKIE_SALT, COOKIE_SECRET, COOKIE_SESSION_DATA_MAX_AGE, COOKIE_SESSION_DATA_NAME } from '#lib/Constants/Cookies.js';
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

const SECURE_SESSION_OPTIONS: SecureSessionPluginOptions = {
	cookie: {
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
app.setGlobalPrefix('api');

await app.register(FastifyCookie);
await app.register(FastifySecureSession, SECURE_SESSION_OPTIONS);

await app.listen(APP_PORT, APP_HOST).then(async () => logger.info(`Listening on address '${await app.getUrl()}'`));

declare module 'fastify' {
	interface FastifyRequest {
		sessionId: string;
		sessionUserId: string;
	}
}
