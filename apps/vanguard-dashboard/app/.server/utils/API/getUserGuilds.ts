import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import type { UserGuild } from '#server/lib/Types/API.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getUserGuilds(request: Request): Promise<UserGuild[]> {
	const response = await createRequest(request);
	const responseBody = await response.json();

	const { ok } = response;

	if (ok) {
		return responseBody;
	}

	return [];
}

async function createRequest(request: Request): Promise<Response> {
	const requestUrl = `${BASE_API_URL}/api/guilds`;
	const requestCookie = getCookieHeader(request);

	const response = await fetch(requestUrl, {
		headers: {
			cookie: requestCookie,
		},
	});

	return response;
}
