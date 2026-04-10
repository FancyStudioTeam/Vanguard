import { Module } from '@nestjs/common';
import { DiscordService } from './Discord.service.js';
import { DiscordParserModule } from './Parser/DiscordParser.module.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		DiscordParserModule,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
