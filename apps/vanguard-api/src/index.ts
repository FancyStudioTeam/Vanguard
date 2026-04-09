import FastifyCookie from '@fastify/cookie';
import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '#modules/app.module.js';

const PORT = 3001;

const APP_MODULE = AppModule;
const APP_ADAPTER = new FastifyAdapter();
const APP_OPTIONS: NestApplicationOptions = {
	logger: false,
};

const app = await NestFactory.create<NestFastifyApplication>(
	APP_MODULE,
	APP_ADAPTER,
	APP_OPTIONS,
);

await app.register(FastifyCookie);
await app.listen(PORT);
