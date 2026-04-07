import { type NextRequest, NextResponse } from 'next/server';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.ts';
import { exchangeAccessCode } from '#utils/Discord/exchangeAccessCode.ts';
import { getCurrentUser } from '#utils/Discord/getCurrentUser.ts';
import { encryptData } from '#utils/Jose/encryptData.ts';
import { handleRouteError } from '#utils/Miscellaneous/handleRouteError.ts';
import { generateSessionId } from './_utils/generateSessionId.ts';
import { saveSessionDocument } from './_utils/saveSessionDocument.ts';
import { saveSessionIdCookie } from './_utils/saveSessionIdCookie.ts';

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
		const { avatar, globalName, id, username } =
			await getCurrentUser(accessToken);

		const encryptedAccessToken = await encryptData(accessToken);
		const encryptedRefreshToken = await encryptData(refreshToken);

		const sessionId = generateSessionId();

		await saveSessionDocument(sessionId, {
			credentials: {
				accessToken: encryptedAccessToken,
				refreshToken: encryptedRefreshToken,
			},
			user: {
				avatar,
				globalName,
				id,
				username,
			},
		});
		await saveSessionIdCookie(sessionId, {
			expiresIn,
		});

		return NextResponse.redirect(origin);
	} catch (error) {
		return handleRouteError(nextRequest, error);
	}
}
