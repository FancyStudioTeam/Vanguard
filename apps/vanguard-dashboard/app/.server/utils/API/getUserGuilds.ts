import { match } from 'ts-pattern';

import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import type { UserGuild } from '#server/lib/Types/API.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getUserGuilds(request: Request): Promise<UserGuild[]> {
	return await match(await createRequest(request))
		.returnType<Promise<UserGuild[]>>()
		.with(
			{
				ok: true,
			},
			async (response) => await response.json(),
		)
		.otherwise(async () => []);
}

async function createRequest(request: Request): Promise<Response> {
	const cookie = getCookieHeader(request);
	const response = await fetch(`${BASE_API_URL}/api/guilds`, {
		headers: {
			cookie,
		},
	});

	return response;
}
