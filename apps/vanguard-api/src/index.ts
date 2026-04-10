import './env.js';

import FastifyCookie from '@fastify/cookie';
import FastifySecureSession from '@fastify/secure-session';
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

const app = await NestFactory.create<NestFastifyApplication>(APP_MODULE, APP_ADAPTER, APP_OPTIONS);

await app.register(FastifyCookie);
await app.register(FastifySecureSession, {
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
});
await app.listen(APP_PORT);
