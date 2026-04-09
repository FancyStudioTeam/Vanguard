import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller.js';

@Module({
	controllers: [
		AuthController,
	],
})
export class AuthModule {}
