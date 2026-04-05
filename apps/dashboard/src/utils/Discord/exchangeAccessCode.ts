import {
	type RESTPostOAuth2AccessTokenResult,
	RouteBases,
	Routes,
} from 'discord-api-types/v10';
import { match } from 'ts-pattern';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants.ts';
import { TOO_MANY_REQUESTS_STATUS_CODE } from '#lib/HttpStatus.ts';
import type { UserCredentials } from '#types/Discord.ts';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.ts';

const { api } = RouteBases;
const { oauth2TokenExchange: oauth2TokenExchangeEndpoint } = Routes;

export async function exchangeAccessCode(
	code: string,
): Promise<AccessCodeData> {
	try {
		const response = await createExchangeAccessCodeRequest(code);
		const { ok, status } = response;

		if (!ok) {
			return match(status)
				.returnType<AccessCodeData>()
				.with(
					TOO_MANY_REQUESTS_STATUS_CODE,
					buildAccessCodeRateLimitData,
				)
				.otherwise(buildAccessCodeErrorData);
		}

		const rawUserCredentials: RESTPostOAuth2AccessTokenResult | null =
			await response.json().catch(() => null);

		if (!rawUserCredentials) {
			return buildAccessCodeErrorData();
		}

		const { accessToken, refreshToken } =
			parseUserCredentials(rawUserCredentials);

		return buildAccessCodeSuccessData(accessToken, refreshToken);
	} catch {
		return buildAccessCodeErrorData();
	}
}

function buildAccessCodeErrorData(): AccessCodeErrorData {
	return {
		status: AccessCodeDataStatus.Error,
	};
}

function buildAccessCodeRateLimitData(): AccessCodeRateLimitData {
	return {
		status: AccessCodeDataStatus.RateLimit,
	};
}

function buildAccessCodeSuccessData(
	accessToken: string,
	refreshToken: string,
): AccessCodeSuccessData {
	return {
		accessToken,
		refreshToken,
		status: AccessCodeDataStatus.Success,
	};
}

async function createExchangeAccessCodeRequest(
	code: string,
): Promise<Response> {
	return await fetch(`${api}/${oauth2TokenExchangeEndpoint()}`, {
		body: createExchangeAccessCodeRequestBody(code),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		method: 'POST',
	});
}

function createExchangeAccessCodeRequestBody(code: string): string {
	const urlSearchParams = new URLSearchParams();

	urlSearchParams.append('client_id', CLIENT_ID);
	urlSearchParams.append('client_secret', CLIENT_SECRET);

	urlSearchParams.append('code', code);
	urlSearchParams.append(
		'scope',
		'email guilds guilds.members.read identify',
	);
	urlSearchParams.append('grant_type', 'authorization_code');

	urlSearchParams.append('redirect_uri', createCallbackUrl());

	return urlSearchParams.toString();
}

function parseUserCredentials({
	access_token,
	refresh_token,
}: RESTPostOAuth2AccessTokenResult): UserCredentials {
	return {
		accessToken: access_token,
		refreshToken: refresh_token,
	};
}

export interface AccessCodeDataBase<Status extends AccessCodeDataStatus> {
	status: Status;
}

export interface AccessCodeSuccessData
	extends AccessCodeDataBase<AccessCodeDataStatus.Success> {
	accessToken: string;
	refreshToken: string;
}

export type AccessCodeData =
	| AccessCodeErrorData
	| AccessCodeRateLimitData
	| AccessCodeSuccessData;

export type AccessCodeErrorData =
	AccessCodeDataBase<AccessCodeDataStatus.Error>;
export type AccessCodeRateLimitData =
	AccessCodeDataBase<AccessCodeDataStatus.RateLimit>;

export enum AccessCodeDataStatus {
	Error = 'ERROR',
	RateLimit = 'RATE_LIMIT',
	Success = 'SUCCESS',
}
