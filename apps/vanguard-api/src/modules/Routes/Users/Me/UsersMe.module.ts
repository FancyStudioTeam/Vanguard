import { Module } from '@nestjs/common';
import { UsersMeController } from './UsersMe.controller.js';

@Module({
	controllers: [
		UsersMeController,
	],
})
export class UsersMeModule {}
