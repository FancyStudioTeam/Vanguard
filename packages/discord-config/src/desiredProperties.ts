import {
	DesiredPropertiesBehavior,
	type RecursivePartial,
	type TransformersDesiredProperties,
} from '@discordeno/bot';

export const DESIRED_CHANNEL_PROPERTIES = {
	id: true,
	name: true,
	permissionOverwrites: true,
	permissions: true,
	type: true,
} as const satisfies DesiredChannelProperties;

export const DESIRED_GUILD_PROPERTIES = {
	icon: true,
	id: true,
	name: true,
	ownerId: true,
	toggles: true,
} as const satisfies DesiredGuildProperties;

export const DESIRED_INTERACTION_PROPERTIES = {
	data: true,
	guildId: true,
	id: true,
	token: true,
	type: true,
	user: true,
} as const satisfies DesiredInteractionProperties;

export const DESIRED_MEMBER_PROPERTIES = {
	avatar: true,
	banner: true,
	guildId: true,
	id: true,
	nick: true,
	permissions: true,
	roles: true,
	toggles: true,
	user: true,
} as const satisfies DesiredMemberProperties;

export const DESIRED_MESSAGE_PROPERTIES = {
	author: true,
	channelId: true,
	components: true,
	content: true,
	id: true,
} as const satisfies DesiredMessageProperties;

export const DESIRED_USER_PROPERTIES = {
	avatar: true,
	discriminator: true,
	id: true,
	toggles: true,
	username: true,
} as const satisfies DesiredUserProperties;

export const DESIRED_PROPERTIES = {
	channel: DESIRED_CHANNEL_PROPERTIES,
	guild: DESIRED_GUILD_PROPERTIES,
	interaction: DESIRED_INTERACTION_PROPERTIES,
	member: DESIRED_MEMBER_PROPERTIES,
	message: DESIRED_MESSAGE_PROPERTIES,
	user: DESIRED_USER_PROPERTIES,
} as const satisfies DesiredProperties;

export const DESIRED_PROPERTIES_BEHAVIOR = DesiredPropertiesBehavior.RemoveKey;

export type DesiredProperties = RecursivePartial<TransformersDesiredProperties>;

export type DesiredChannelProperties = DesiredProperties['channel'];
export type DesiredGuildProperties = DesiredProperties['guild'];
export type DesiredInteractionProperties = DesiredProperties['interaction'];
export type DesiredMemberProperties = DesiredProperties['member'];
export type DesiredMessageProperties = DesiredProperties['message'];
export type DesiredUserProperties = DesiredProperties['user'];
