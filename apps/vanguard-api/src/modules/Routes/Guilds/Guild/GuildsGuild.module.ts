import { Module } from '@nestjs/common';
import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { GuildsGuildController } from './GuildsGuild.controller.js';

@Module({
	controllers: [
		GuildsGuildController,
	],
	imports: [
		DiscordModule,
	],
})
export class GuildsGuildModule {}
