import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '#interceptors/LoggerInterceptor.js';
import { AppController } from './App.controller.js';
import { AuthModule } from './auth/Auth.module.js';

@Module({
	controllers: [
		AppController,
	],
	imports: [
		AuthModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
	],
})
export class AppModule {}
