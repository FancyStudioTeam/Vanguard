import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_COLLECTION_NAME } from '#lib/Constants/MongoDB.js';
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
				collection: MONGO_DB_COLLECTION_NAME,
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
