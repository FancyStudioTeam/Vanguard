import { OAuth2Routes, OAuth2Scopes } from 'discord-api-types/v10';

import { CLIENT_ID } from '#lib/Constants/Client.js';
import { createCallbackUrl } from './createCallbackUrl.js';

/**
 * @see https://docs.discord.com/developers/topics/oauth2#authorization-code-grant
 */
export function createRedirectUrl(): string {
	const url = new URL(OAuth2Routes.authorizationURL);
	const urlSearchParams = url.searchParams;

	urlSearchParams.append('client_id', CLIENT_ID);

	urlSearchParams.append('response_type', 'code');
	urlSearchParams.append('prompt', 'none');

	urlSearchParams.append(
		'scope',
		[
			OAuth2Scopes.Email,
			OAuth2Scopes.Identify,
			OAuth2Scopes.Guilds,
			OAuth2Scopes.GuildsMembersRead,
		].join(encodeURIComponent(' ')),
	);

	urlSearchParams.append('redirect_uri', createCallbackUrl());

	return url.toString();
}
