import { randomBytes } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import { type CreateSessionOptions, Session } from '#schemas/Mongoose/Session.js';
import { EncryptionService } from '../Encryption/Encryption.service.js';

@Injectable()
export class SessionsService {
	static SESSION_ID_BYTES_LENGTH = 32 as const;

	public constructor(
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@InjectModel(Session.name) private readonly sessionModel: Model<Session>,
	) {}

	public async createDatabaseSession(options: CreateSessionOptions): Promise<Session> {
		return await this.sessionModel.create(options);
	}

	public generateSessionId(): string {
		const sessionIdBytes = randomBytes(SessionsService.SESSION_ID_BYTES_LENGTH);
		const sessionId = sessionIdBytes.toString('hex');

		return sessionId;
	}

	public async getAccessToken(sessionId: string): Promise<string> {
		const session = await this.getDatabaseSession(sessionId);

		if (!session) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const { accessToken } = session;

		return this.encryptionService.decrypt(accessToken);
	}

	public async getDatabaseSession(sessionId: string): Promise<Session | null> {
		return await this.sessionModel.findOne({
			sessionId,
		});
	}
}
