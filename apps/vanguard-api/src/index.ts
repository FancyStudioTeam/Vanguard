import './env.js';

import FastifyCookie from '@fastify/cookie';
import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '#modules/App.module.js';

const PORT = 3001;

const APP_MODULE = AppModule;
const APP_ADAPTER = new FastifyAdapter();
const APP_OPTIONS: NestApplicationOptions = {
	logger: [
		'error',
		'fatal',
	],
};

const app = await NestFactory.create<NestFastifyApplication>(
	APP_MODULE,
	APP_ADAPTER,
	APP_OPTIONS,
);

await app.register(FastifyCookie);
await app.listen(PORT);
