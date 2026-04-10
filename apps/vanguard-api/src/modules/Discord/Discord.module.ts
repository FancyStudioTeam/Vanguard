import { Module } from '@nestjs/common';
import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
