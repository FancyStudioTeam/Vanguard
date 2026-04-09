import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '#schemas/Mongoose/Session.js';
import { AuthController } from './Auth.controller.js';
import { AuthDiscordService, AuthService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	imports: [
		MongooseModule.forFeature([
			{
				name: Session.name,
				schema: SessionSchema,
			},
		]),
	],
	providers: [
		AuthDiscordService,
		AuthService,
	],
})
export class AuthModule {}
