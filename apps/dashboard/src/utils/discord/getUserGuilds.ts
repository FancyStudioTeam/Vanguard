import {
	PermissionFlagsBits,
	type RESTAPIPartialCurrentUserGuild,
	RouteBases,
	Routes,
} from 'discord-api-types/v10';
import { TOO_MANY_REQUESTS_STATUS_CODE } from '#/lib/HttpStatus.ts';
import type { UserGuild } from '#/lib/types/User.ts';
import { hasPermission } from '../hasPermission.ts';

const { api } = RouteBases;
const { userGuilds: userGuildsEndpoint } = Routes;

export async function getUserGuilds(accessToken: string): Promise<UserGuildsData> {
	try {
		const response = await createUserGuildsRequest(accessToken);
		const { ok, status } = response;

		if (!ok) {
			if (status === TOO_MANY_REQUESTS_STATUS_CODE) {
				return buildUserGuildsRateLimitData();
			}

			return buildUserGuildsErrorData();
		}

		const rawUserGuilds: RESTAPIPartialCurrentUserGuild[] | null = await response
			.json()
			.catch(() => null);

		if (!rawUserGuilds) {
			return buildUserGuildsErrorData();
		}

		const userGuilds = parseUserGuilds(rawUserGuilds);
		const userGuildsWithPermissions = filterGuildsWithPermissions(userGuilds);

		return buildUserGuildsData(userGuildsWithPermissions);
	} catch {
		return buildUserGuildsErrorData();
	}
}

async function createUserGuildsRequest(accessToken: string): Promise<Response> {
	return await fetch(`${api}/${userGuildsEndpoint()}`, {
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

function buildUserGuildsData(userGuilds: UserGuild[]): UserGuildsData {
	return {
		guilds: userGuilds,
		isError: false,
		isRateLimit: false,
	};
}

function buildUserGuildsErrorData(): UserGuildsData {
	return {
		guilds: [],
		isError: true,
		isRateLimit: false,
	};
}

function buildUserGuildsRateLimitData(): UserGuildsData {
	return {
		guilds: [],
		isError: false,
		isRateLimit: true,
	};
}

function filterGuildsWithPermissions(userGuilds: UserGuild[]): UserGuild[] {
	return userGuilds.filter(({ permissions }) =>
		hasPermission(permissions, PermissionFlagsBits.ManageGuild),
	);
}

function parseUserGuild(rawUserGuild: RESTAPIPartialCurrentUserGuild): UserGuild {
	const { icon, id, name, owner, permissions } = rawUserGuild;

	return {
		icon,
		id,
		name,
		owner,
		permissions,
	};
}

function parseUserGuilds(rawUserGuilds: RESTAPIPartialCurrentUserGuild[]): UserGuild[] {
	return rawUserGuilds.map(parseUserGuild);
}

interface UserGuildsData {
	guilds: UserGuild[];
	isError: boolean;
	isRateLimit: boolean;
}
