import { Module } from '@nestjs/common';

import { AuthModule } from '#modules/Auth/Auth.module.js';
import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { UserController } from './User.controller.js';
import { UserService } from './User.service.js';

@Module({
	controllers: [
		UserController,
	],
	imports: [
		AuthModule,
		DiscordModule,
		ParserModule,
	],
	providers: [
		UserService,
	],
})
export class UserModule {}
