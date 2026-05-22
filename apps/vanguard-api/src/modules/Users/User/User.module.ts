import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { UserController } from './User.controller.js';

@Module({
	controllers: [
		UserController,
	],
	imports: [
		DiscordModule,
		ParserModule,
		SessionsModule,
	],
})
export class UserModule {}
