import { randomBytes } from 'node:crypto';
import { cookies as NextCookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { COOKIE_SESSION_NAME } from '#lib/Constants/Cookies.ts';
import { SessionsCollection } from '#lib/MongoDB/Auth.ts';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.ts';
import { exchangeAccessCode } from '#utils/Discord/exchangeAccessCode.ts';
import { getCurrentUser } from '#utils/Discord/getCurrentUser.ts';
import { createJsonWebToken } from '#utils/Jose/createJsonWebToken.ts';
import { encryptData } from '#utils/Jose/encryptData.ts';
import { handleRouteError } from '#utils/Miscellaneous/handleRouteError.ts';

const SESSION_ID_BYTES_LENGTH = 32;

export async function GET(nextRequest: NextRequest) {
	try {
		const { nextUrl } = nextRequest;
		const { origin, searchParams } = nextUrl;

		const code = searchParams.get('code');

		if (!code) {
			return MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const { accessToken, expiresIn, refreshToken } =
			await exchangeAccessCode(code);
		const user = await getCurrentUser(accessToken);

		const encryptedAccessToken = await encryptData(accessToken);
		const encryptedRefreshToken = await encryptData(refreshToken);

		const sessionIdBytes = randomBytes(SESSION_ID_BYTES_LENGTH);
		const sessionId = sessionIdBytes.toString('hex');

		await SessionsCollection.insertOne({
			credentials: {
				accessToken: encryptedAccessToken,
				refreshToken: encryptedRefreshToken,
			},
			sessionId,
		});

		const jsonWebToken = await createJsonWebToken({
			sid: sessionId,
			user,
		});
		const nextCookies = await NextCookies();

		nextCookies.set(COOKIE_SESSION_NAME, jsonWebToken, {
			httpOnly: true,
			maxAge: expiresIn,
			path: '/',
			sameSite: 'lax',
			secure: true,
		});

		return NextResponse.redirect(origin);
	} catch (error) {
		return handleRouteError(nextRequest, error);
	}
}
