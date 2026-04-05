import {
	PermissionFlagsBits,
	type RESTAPIPartialCurrentUserGuild,
	RouteBases,
	Routes,
} from 'discord-api-types/v10';
import { match } from 'ts-pattern';
import { TOO_MANY_REQUESTS_STATUS_CODE } from '#lib/HttpStatus.ts';
import type { UserGuild } from '#types/Discord.ts';
import { hasPermission } from './hasPermission.ts';

const { api } = RouteBases;
const { userGuilds: userGuildsEndpoint } = Routes;

export async function getUserGuilds(
	accessToken: string,
): Promise<UserGuildsData> {
	try {
		const response = await createUserGuildsRequest(accessToken);
		const { ok, status } = response;

		if (!ok) {
			return match(status)
				.returnType<UserGuildsData>()
				.with(
					TOO_MANY_REQUESTS_STATUS_CODE,
					buildUserGuildsRateLimitData,
				)
				.otherwise(buildUserGuildsErrorData);
		}

		const rawUserGuilds: RESTAPIPartialCurrentUserGuild[] | null =
			await response.json().catch(() => null);

		if (!rawUserGuilds) {
			return buildUserGuildsErrorData();
		}

		const userGuilds = parseUserGuilds(rawUserGuilds);
		const userGuildsWithPermissions =
			filterGuildsWithPermissions(userGuilds);

		return buildUserGuildsSuccessData(userGuildsWithPermissions);
	} catch {
		return buildUserGuildsErrorData();
	}
}

function buildUserGuildsErrorData(): UserGuildsErrorData {
	return {
		status: UserGuildsDataStatus.Error,
	};
}

function buildUserGuildsRateLimitData(): UserGuildsRateLimitData {
	return {
		status: UserGuildsDataStatus.RateLimit,
	};
}

function buildUserGuildsSuccessData(
	userGuilds: UserGuild[],
): UserGuildsSuccessData {
	return {
		guilds: userGuilds,
		status: UserGuildsDataStatus.Success,
	};
}

async function createUserGuildsRequest(accessToken: string): Promise<Response> {
	return await fetch(`${api}/${userGuildsEndpoint()}?with_counts=true`, {
		cache: 'force-cache',
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		next: {
			revalidate: 15,
			tags: [
				`user-guilds-${accessToken}`,
			],
		},
	});
}

function filterGuildsWithPermissions(userGuilds: UserGuild[]): UserGuild[] {
	return userGuilds.filter(({ permissions }) =>
		hasPermission(permissions, PermissionFlagsBits.ManageGuild),
	);
}

function parseUserGuild(
	apiUserGuild: RESTAPIPartialCurrentUserGuild,
): UserGuild {
	const { banner, icon, id, name, owner, permissions } = apiUserGuild;

	return {
		banner,
		icon,
		id,
		name,
		owner,
		permissions,
	};
}

function parseUserGuilds(
	rawUserGuilds: RESTAPIPartialCurrentUserGuild[],
): UserGuild[] {
	return rawUserGuilds.map(parseUserGuild);
}

export interface UserGuildsDataBase<Status extends UserGuildsDataStatus> {
	status: Status;
}

export interface UserGuildsSuccessData
	extends UserGuildsDataBase<UserGuildsDataStatus.Success> {
	guilds: UserGuild[];
}

export type UserGuildsData =
	| UserGuildsErrorData
	| UserGuildsRateLimitData
	| UserGuildsSuccessData;

export type UserGuildsErrorData =
	UserGuildsDataBase<UserGuildsDataStatus.Error>;
export type UserGuildsRateLimitData =
	UserGuildsDataBase<UserGuildsDataStatus.RateLimit>;

export enum UserGuildsDataStatus {
	Error = 'ERROR',
	RateLimit = 'RATE_LIMIT',
	Success = 'SUCCESS',
}
