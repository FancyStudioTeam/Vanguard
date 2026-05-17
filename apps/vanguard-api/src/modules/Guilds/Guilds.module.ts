import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildModule } from './Guild/Guild.module.js';
import { TicketsModule } from './Guild/Tickets/Tickets.module.js';
import { GuildsController } from './Guilds.controller.js';

@Module({
	controllers: [
		GuildsController,
	],
	imports: [
		CacheModule.register(),
		DiscordModule,
		DiscordUtilsModule,
		GuildModule,
		RouterModule.register([
			{
				children: [
					{
						children: [
							{
								module: TicketsModule,
								path: 'tickets',
							},
						],
						module: GuildModule,
						path: ':guildId',
					},
				],
				path: 'guilds',
			},
		]),
		SessionsModule,
	],
})
export class GuildsModule {}
