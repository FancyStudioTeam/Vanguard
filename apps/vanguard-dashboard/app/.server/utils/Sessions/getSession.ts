import { redirect } from 'react-router';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getSession(request: Request): Promise<SessionData> {
	const response = await createRequest(request);
	const { ok } = response;

	if (!ok) {
		throw redirect('/');
	}

	const data = await response.json();
	const { guilds, user } = data;

	return {
		guilds,
		user,
	};
}

async function createRequest(request: Request): Promise<Response> {
	const cookie = getCookieHeader(request);
	const response = await fetch(`${BASE_API_URL}/auth/session`, {
		headers: {
			cookie,
		},
	});

	return response;
}

export interface SessionData {
	guilds: SessionUserGuild[];
	user: SessionUser;
}

export interface SessionUser {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}

export interface SessionUserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}
