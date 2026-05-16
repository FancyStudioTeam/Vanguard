import type { RESTGetAPIUserGuilds } from '@vanguard/api-types/rest';

import { redirect } from 'react-router';

import { HttpStatus } from '#server/lib/Constants/HttpStatus.ts';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getUserGuilds(request: Request): Promise<RESTGetAPIUserGuilds> {
	const response = await createRequest(request);
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
