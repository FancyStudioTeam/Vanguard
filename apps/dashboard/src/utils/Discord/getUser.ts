import {
	type APIUser,
	type RESTGetAPICurrentUserResult,
	RouteBases,
	Routes,
} from 'discord-api-types/v10';
import { match } from 'ts-pattern';
import { TOO_MANY_REQUESTS_STATUS_CODE } from '#lib/HttpStatus.ts';
import type { User } from '#types/Discord.ts';

const { api } = RouteBases;
const { user: userEndpoint } = Routes;

export async function getUser(accessToken: string): Promise<UserData> {
	try {
		const response = await createUserRequest(accessToken);
		const { ok, status } = response;

		if (!ok) {
			return match(status)
				.returnType<UserData>()
				.with(TOO_MANY_REQUESTS_STATUS_CODE, buildUserRateLimitData)
				.otherwise(buildUserErrorData);
		}

		const rawUser: RESTGetAPICurrentUserResult | null = await response
			.json()
			.catch(() => null);

		if (!rawUser) {
			return buildUserErrorData();
		}

		return buildUserSuccessData(parseUser(rawUser));
	} catch {
		return buildUserErrorData();
	}
}

function buildUserErrorData(): UserErrorData {
	return {
		status: UserDataStatus.Error,
	};
}

function buildUserRateLimitData(): UserRateLimitData {
	return {
		status: UserDataStatus.RateLimit,
	};
}

function buildUserSuccessData(user: User): UserSuccessData {
	return {
		status: UserDataStatus.Success,
		user,
	};
}

async function createUserRequest(accessToken: string): Promise<Response> {
	return await fetch(`${api}/${userEndpoint('@me')}`, {
		cache: 'force-cache',
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		next: {
			revalidate: 30,
			tags: [
				`user-${accessToken}`,
			],
		},
	});
}

function parseUser({ avatar, id, global_name, username }: APIUser): User {
	return {
		avatar,
		id,
		name: global_name ?? username,
	};
}

export interface UserDataBase<Status extends UserDataStatus> {
	status: Status;
}

export interface UserSuccessData extends UserDataBase<UserDataStatus.Success> {
	user: User;
}

export type UserData = UserErrorData | UserRateLimitData | UserSuccessData;

export type UserErrorData = UserDataBase<UserDataStatus.Error>;
export type UserRateLimitData = UserDataBase<UserDataStatus.RateLimit>;

export enum UserDataStatus {
	Error = 'ERROR',
	RateLimit = 'RATE_LIMIT',
	Success = 'SUCCESS',
}
