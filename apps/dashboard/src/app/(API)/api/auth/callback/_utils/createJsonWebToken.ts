import 'server-only';
import type { APIUser } from 'discord-api-types/v10';
import type { cookies } from 'next/headers';
import { JoseUtils } from '#/lib/Jose.ts';

export async function createJsonWebToken(
	nextCookies: NextCookies,
	options: CreateJsonWebTokenOptions,
): Promise<void> {
	const { expiresIn, sessionId, user } = options;
	const { id: userId } = user;

	const jsonWebToken = await JoseUtils.sign(sessionId, userId, user);

	nextCookies.set('session', jsonWebToken, {
		httpOnly: true,
		maxAge: expiresIn,
		path: '/',
		sameSite: 'lax',
		secure: true,
	});
}

interface CreateJsonWebTokenOptions {
	expiresIn: number;
	sessionId: string;
	user: APIUser;
}

type NextCookies = Awaited<ReturnType<typeof cookies>>;
