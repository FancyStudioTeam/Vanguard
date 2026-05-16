// biome-ignore-all lint/style/useNamingConvention: (x)

import type { APIGuild, APIUser, APIUserGuild } from '#interfaces/discord.js';

export type RESTGetAPIGuild = APIGuild;

export type RESTGetAPIUser = APIUser;
export type RESTGetAPIUserGuilds = APIUserGuild[];
