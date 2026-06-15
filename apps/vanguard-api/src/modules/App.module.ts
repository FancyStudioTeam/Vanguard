import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { HttpExceptionFilter } from '#common/Filters/HttpExceptionFilter.js';
import { AuthGuard } from '#common/Guards/AuthGuard.js';
import { LoggerMiddleware } from '#common/Middlewares/LoggerMiddleware.js';
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
