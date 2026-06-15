import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpExceptionFilter } from '#common/Filters/HttpExceptionFilter.js';
import { AuthGuard } from '#common/Guards/AuthGuard.js';
import { LoggerMiddleware } from '#common/Middlewares/LoggerMiddleware.js';
import {
	SESSIONS_DATABASE_HOST,
	SESSIONS_DATABASE_NAME,
	SESSIONS_DATABASE_PORT,
	SESSIONS_DATABASE_USER_NAME,
	SESSIONS_DATABASE_USER_PASSWORD,
} from '#lib/Constants/Sessions.js';
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
		RouterModule.register([
			GuildsRoutes,
			UsersRoutes,
		]),
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			autoLoadEntities: true,
			database: SESSIONS_DATABASE_NAME,
			host: SESSIONS_DATABASE_HOST,
			password: SESSIONS_DATABASE_USER_PASSWORD,
			port: Number(SESSIONS_DATABASE_PORT),
			synchronize: true,
			type: 'postgres',
			username: SESSIONS_DATABASE_USER_NAME,
		}),
		UsersModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
