import type { Camelize, DiscordUser } from '@discordeno/types';
import { rest } from '#lib/REST.ts';
import type { User } from '#types/Discord.ts';

export async function getCurrentUser(accessToken: string): Promise<User> {
	const response = await rest.getCurrentUser(accessToken);
	const user = parseUser(response);

	return user;
}

function parseUser({
	avatar,
	globalName,
	id,
	username,
}: Camelize<DiscordUser>): User {
	return {
		avatar,
		id,
		name: globalName ?? username,
	};
}
