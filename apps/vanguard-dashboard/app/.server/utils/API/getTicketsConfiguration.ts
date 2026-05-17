import type { RESTGetAPIGuildTicketsConfigurationResponse } from '@vanguard/api-types/rest';

import { redirect } from 'react-router';

import { HttpStatus } from '#server/lib/Constants/HttpStatus.ts';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getTicketsConfiguration(guildId: string, request: Request): Promise<RESTGetAPIGuildTicketsConfigurationResponse> {
	const response = await createRequest(guildId, request);
	const responseBody = await response.json();

	const { ok, status } = response;

	if (ok) {
		return responseBody;
	}

	if (status === HttpStatus.Unauthorized) {
		throw redirect(`${BASE_API_URL}/api/auth/sign-in`);
	}

	const { code, message } = responseBody;

	throw redirect(`/?message=${code ?? message}`);
}

async function createRequest(guildId: string, request: Request): Promise<Response> {
	const requestUrl = `${BASE_API_URL}/api/guilds/${guildId}/tickets`;
	const requestCookie = getCookieHeader(request);

	const response = await fetch(requestUrl, {
		headers: {
			cookie: requestCookie,
		},
	});

	return response;
}
