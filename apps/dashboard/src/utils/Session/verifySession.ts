import { unauthorized } from 'next/navigation';
import { BASE_API_URL } from '#lib/Constants/Shared.ts';
import type { SessionData } from '#types/Auth.ts';
import { getAllCookiesString } from './getAllCookiesString.ts';

export async function verifySession(
	shouldRedirect?: boolean,
): Promise<SessionData | null>;
export async function verifySession(shouldRedirect: true): Promise<SessionData>;

export async function verifySession(
	shouldRedirect?: boolean,
): Promise<SessionData | null> {
	const cookie = await getAllCookiesString();
	const response = await fetch(`${BASE_API_URL}/auth/session`, {
		headers: {
			cookie,
		},
	});

	const { ok } = response;

	if (!ok) {
		if (shouldRedirect) {
			unauthorized();
		}

		return null;
	}

	const { user, guilds } = await response.json();

	return {
		guilds,
		user,
	};
}
