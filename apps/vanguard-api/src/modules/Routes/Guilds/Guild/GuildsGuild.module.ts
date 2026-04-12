import { Module } from '@nestjs/common';
import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { SessionsModule } from '#modules/Utils/Sessions/Sessions.module.js';
import { GuildsGuildController } from './GuildsGuild.controller.js';

@Module({
	controllers: [
		GuildsGuildController,
	],
	imports: [
		DiscordModule,
		SessionsModule,
	],
})
export class GuildsGuildModule {}
