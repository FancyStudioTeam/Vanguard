import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpExceptionFilter } from '#common/Filters/HttpExceptionFilter.js';
import { LoggerInterceptor } from '#common/Interceptors/LoggerInterceptor.js';
import { MONGO_DB_CONNECTION_URL } from '#lib/Constants/MongoDB.js';
import { AuthModule } from './Auth/Auth.module.js';
import { GuildsModule } from './Guilds/Guilds.module.js';
import { UserModule } from './User/User.module.js';

@Module({
	imports: [
		AuthModule,
		MongooseModule.forRoot(MONGO_DB_CONNECTION_URL, {
			dbName: 'sessions',
		}),
		RouterModule.register([
			{
				module: GuildsModule,
				path: 'guilds',
			},
			{
				children: [
					{
						module: UserModule,
						path: ':id',
					},
				],
				path: 'users',
			},
		]),
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
