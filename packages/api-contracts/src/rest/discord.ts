import type {
	DiscordGuild,
	DiscordGuildChannel,
	DiscordUser,
	DiscordUserGuild,
} from '#interfaces/discord.js';

export type GetDiscordGuildResult = DiscordGuild;
export type GetDiscordGuildChannelsResult = DiscordGuildChannel[];

export type GetDiscordUserResult = DiscordUser;
export type GetDiscordUserGuildsResult = DiscordUserGuild[];
