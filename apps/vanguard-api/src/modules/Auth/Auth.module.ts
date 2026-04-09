import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { Session, SessionSchema } from '#schemas/Mongoose/Session.js';
import { AuthController } from './Auth.controller.js';
import { AuthDiscordService, AuthService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	imports: [
		EncryptionModule,
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
