import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpExceptionFilter } from '#common/Filters/HttpExceptionFilter.js';
import { AuthGuard } from '#common/Guards/AuthGuard.js';
import { LoggerInterceptor } from '#common/Interceptors/LoggerInterceptor.js';
import { MONGO_DB_CONNECTION_URL } from '#lib/Constants/MongoDB.js';
import { AuthModule } from './Auth/Auth.module.js';
import { DiscordModule } from './Discord/Discord.module.js';
import { GuildsModule } from './Guilds/Guilds.module.js';
import { GuildsRoutes } from './Guilds/Guilds.routes.js';
import { UsersModule } from './Users/Users.module.js';
import { UsersRoutes } from './Users/Users.routes.js';

@Module({
	imports: [
		AuthModule,
		DiscordModule,
		GuildsModule,
		MongooseModule.forRoot(MONGO_DB_CONNECTION_URL, {
			dbName: 'sessions',
		}),
		RouterModule.register([
			GuildsRoutes,
			UsersRoutes,
		]),
		UsersModule,
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
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
