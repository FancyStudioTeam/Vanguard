import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from '#filters/HttpExceptionFilter.js';
import { LoggerInterceptor } from '#interceptors/LoggerInterceptor.js';
import { MONGO_DB_CONNECTION_URL } from '#lib/Constants/MongoDB.js';
import { AppController } from './App.controller.js';
import { AuthModule } from './Auth/Auth.module.js';
import { EncryptionModule } from './Encryption/Encryption.module.js';
import { SessionsModule } from './Sessions/Sessions.module.js';

@Module({
	controllers: [
		AppController,
	],
	imports: [
		AuthModule,
		EncryptionModule,
		MongooseModule.forRoot(MONGO_DB_CONNECTION_URL, {
			dbName: 'sessions',
		}),
		SessionsModule,
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
