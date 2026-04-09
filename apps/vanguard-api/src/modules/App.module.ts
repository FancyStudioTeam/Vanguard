import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '#filters/HttpExceptionFilter.js';
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
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
	],
})
export class AppModule {}
