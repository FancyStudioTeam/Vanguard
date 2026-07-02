import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpExceptionFilter } from '#common/Filters/HttpExceptionFilter.js';
import { AuthGuard } from '#common/Guards/AuthGuard.js';
import { LoggerMiddleware } from '#common/Middlewares/LoggerMiddleware.js';
import {
	POSTGRES_DATABASE_HOST,
	POSTGRES_DATABASE_NAME,
	POSTGRES_DATABASE_PORT,
	POSTGRES_DATABASE_USER_NAME,
	POSTGRES_DATABASE_USER_PASS,
} from '#lib/Constants/TypeORM.js';
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
			database: POSTGRES_DATABASE_NAME,
			entities: [
				GuildWelcomesEntity,
			],
			host: POSTGRES_DATABASE_HOST,
			password: POSTGRES_DATABASE_USER_PASS,
			port: POSTGRES_DATABASE_PORT,
			synchronize: true,
			type: 'postgres',
			username: POSTGRES_DATABASE_USER_NAME,
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
