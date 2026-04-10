import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_DB_COLLECTION_NAME } from '#lib/Constants/MongoDB.js';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { Session, SessionSchema } from '#schemas/Mongoose/Session.js';
import { SessionsService } from './Sessions.service.js';

@Module({
	exports: [
		SessionsService,
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
		SessionsService,
	],
})
export class SessionsModule {}
