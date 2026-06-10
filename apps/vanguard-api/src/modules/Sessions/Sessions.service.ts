import { randomBytes } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import { EncryptionService } from '../Encryption/Encryption.service.js';
import { SessionEntity } from './Entities/Session.entity.js';
import { SessionCredentialsEntity } from './Entities/SessionCredentials.entity.js';

@Injectable()
export class SessionsService {
	private static SESSION_ID_BYTES_LENGTH = 32 as const;

	public constructor(
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@InjectRepository(SessionCredentialsEntity)
		private readonly sessionCredentialsRepository: Repository<SessionCredentialsEntity>,
		@InjectRepository(SessionEntity)
		private readonly sessionRepository: Repository<SessionEntity>,
	) {}

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

		const { credentials } = session;
		const { accessToken } = credentials;

		return this.encryptionService.decrypt(accessToken);
	}

	public async getDatabaseSession(sessionId: string): Promise<SessionEntity | null> {
		return await this.sessionRepository.findOne({
			select: {
				credentials: true,
			},
			where: {
				sessionId,
			},
		});
	}

	public async saveSessionCredentials(
		userId: string,
		{ accessToken, refreshToken, tokenType }: SaveSessionCredentials,
	): Promise<SessionCredentialsEntity> {
		const sessionCredentialsEntity = new SessionCredentialsEntity();

		const encryptedAccessToken = this.encryptionService.encrypt(accessToken);
		const encryptedRefreshToken = this.encryptionService.encrypt(refreshToken);

		sessionCredentialsEntity.accessToken = encryptedAccessToken;
		sessionCredentialsEntity.refreshToken = encryptedRefreshToken;
		sessionCredentialsEntity.tokenType = tokenType;
		sessionCredentialsEntity.userId = userId;

		return await this.sessionCredentialsRepository.save(sessionCredentialsEntity);
	}
}

interface SaveSessionCredentials {
	accessToken: string;
	refreshToken: string;
	tokenType: string;
}
