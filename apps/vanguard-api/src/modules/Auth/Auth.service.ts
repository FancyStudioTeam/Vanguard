// biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: (x)

import { randomBytes } from 'node:crypto';
import type { RESTGetAPICurrentUserResult, RESTPostOAuth2AccessTokenResult } from '@discordjs/core';
import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { api } from '#lib/REST.js';
import {
	UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE,
	UNABLE_TO_GET_USER_INFORMATION_RESPONSE,
} from '#lib/Responses/Auth.js';
import { type CreateSessionOptions, Session } from '#schemas/Mongoose/Session.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';

@Injectable()
export class AuthService {
	public constructor(@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

	public async createSession(options: CreateSessionOptions): Promise<Session> {
		const { sessionModel } = this;

		return await sessionModel.create(options);
	}

	public async getSession(sessionId: string): Promise<Session | null> {
		const { sessionModel } = this;

		return await sessionModel.findOne({
			sessionId,
		});
	}

	public generateSessionId(): string {
		const sessionIdBytesLength = 32;

		const sessionIdBytes = randomBytes(sessionIdBytesLength);
		const sessionId = sessionIdBytes.toString('hex');

		return sessionId;
	}
}

@Injectable()
export class AuthDiscordService {
	private createApiObject(accessTokenResult: RESTPostOAuth2AccessTokenResult): API {
		const { access_token } = accessTokenResult;

		const rest = new REST({
			authPrefix: 'Bearer',
		}).setToken(access_token);

		return new API(rest);
	}

	public async exchangeToken(code: string): Promise<RESTPostOAuth2AccessTokenResult> {
		return await api.oauth2
			.tokenExchange({
				// biome-ignore-start lint/style/useNamingConvention: (x)
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri: createCallbackUrl(),
				// biome-ignore-end lint/style/useNamingConvention: (x)
			})
			.catch(() => {
				throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
			});
	}

	public async getCurrentUser(
		accessTokenResult: RESTPostOAuth2AccessTokenResult,
	): Promise<RESTGetAPICurrentUserResult> {
		return await this.createApiObject(accessTokenResult)
			.users.getCurrent()
			.catch(() => {
				throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
			});
	}
}
