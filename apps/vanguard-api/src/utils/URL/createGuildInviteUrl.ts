import { OAuth2Routes, OAuth2Scopes, PermissionFlagsBits } from 'discord-api-types/v10';

import { BOT_ID } from '#lib/Constants/Bot.js';

/**
 * @see https://docs.discord.com/developers/topics/oauth2#bot-authorization-flow
 */
export function createGuildInviteUrl(guildId: string): string {
	const url = new URL(OAuth2Routes.authorizationURL);
	const urlSearchParams = url.searchParams;

	urlSearchParams.append('client_id', BOT_ID);
	urlSearchParams.append('guild_id', guildId);

	urlSearchParams.append('disable_guild_select', String(true));

	urlSearchParams.append('scope', OAuth2Scopes.Bot);

	urlSearchParams.append(
		'permissions',
		String(
			PermissionFlagsBits.EmbedLinks |
				PermissionFlagsBits.ManageGuild |
				PermissionFlagsBits.ReadMessageHistory |
				PermissionFlagsBits.SendMessages |
				PermissionFlagsBits.ViewChannel,
		),
	);

	return url.toString();
}
