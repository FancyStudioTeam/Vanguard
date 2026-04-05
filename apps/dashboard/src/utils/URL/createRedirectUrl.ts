import { OAuth2Routes, OAuth2Scopes } from 'discord-api-types/v10';
import { CLIENT_ID } from '#lib/Constants.ts';
import { createCallbackUrl } from './createCallbackUrl.ts';

const { authorizationURL } = OAuth2Routes;

const SCOPES = [
	OAuth2Scopes.Email,
	OAuth2Scopes.Identify,
	OAuth2Scopes.Guilds,
	OAuth2Scopes.GuildsMembersRead,
];

export function createRedirectUrl(): string {
	const callbackUrl = createCallbackUrl();

	/*
	 * Discord scopes MUST be joined with '+'.
	 */
	const scopesString = SCOPES.join('+');

	const authorizationUrl = new URL(authorizationURL);
	const { searchParams } = authorizationUrl;

	/*
	 * This assignment MUST be made before setting other query string parameters,
	 * as this property overrides all search properties.
	 */
	authorizationUrl.search = `scope=${scopesString}`;

	searchParams.set('client_id', CLIENT_ID);
	searchParams.set('redirect_uri', callbackUrl);
	searchParams.set('response_type', 'code');

	searchParams.set('prompt', 'none');

	return authorizationUrl.toString();
}
