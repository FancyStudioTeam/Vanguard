// biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: (x)

import { randomBytes } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';
import { type CreateSessionOptions, Session } from '#schemas/Mongoose/Session.js';

@Injectable()
export class SessionsService {
	static SESSION_ID_BYTES_LENGTH = 32 as const;

	public constructor(
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@InjectModel(Session.name) private readonly sessionModel: Model<Session>,
	) {}

	public async createDatabaseSession(options: CreateSessionOptions): Promise<Session> {
		const { sessionModel } = this;

		return await sessionModel.create(options);
	}

	public generateSessionId(): string {
		const { SESSION_ID_BYTES_LENGTH } = SessionsService;

		const sessionIdBytes = randomBytes(SESSION_ID_BYTES_LENGTH);
		const sessionId = sessionIdBytes.toString('hex');

		return sessionId;
	}

	public async getAccessToken(sessionId: string): Promise<string> {
		const session = await this.getDatabaseSession(sessionId);

		if (!session) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const { accessToken } = session;
		const { encryptionService } = this;

		const decryptedAccessToken = encryptionService.decrypt(accessToken);

		return decryptedAccessToken;
	}

	public async getDatabaseSession(sessionId: string): Promise<Session | null> {
		const { sessionModel } = this;

		return await sessionModel.findOne({
			sessionId,
		});
	}
}
