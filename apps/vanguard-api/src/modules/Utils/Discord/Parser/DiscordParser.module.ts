import { Module } from '@nestjs/common';
import { DiscordParserService } from './DiscordParser.service.js';

@Module({
	exports: [
		DiscordParserService,
	],
	providers: [
		DiscordParserService,
	],
})
export class DiscordParserModule {}
