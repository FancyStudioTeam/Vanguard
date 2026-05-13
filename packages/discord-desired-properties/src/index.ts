import { DesiredPropertiesBehavior, type RecursivePartial, type TransformersDesiredProperties } from '@discordeno/bot';

export const DESIRED_GUILD_PROPERTIES = {
	icon: true,
	id: true,
	name: true,
	ownerId: true,
	toggles: true,
} satisfies DesiredGuildProperties;

export const DESIRED_INTERACTION_PROPERTIES = {
	data: true,
	id: true,
	token: true,
	type: true,
} satisfies DesiredInteractionProperties;

export const DESIRED_MESSAGE_PROPERTIES = {
	author: true,
	channelId: true,
	components: true,
	content: true,
	id: true,
} satisfies DesiredMessageProperties;

export const DESIRED_USER_PROPERTIES = {
	avatar: true,
	discriminator: true,
	id: true,
	toggles: true,
	username: true,
} satisfies DesiredUserProperties;

export const DESIRED_PROPERTIES = {
	guild: DESIRED_GUILD_PROPERTIES,
	interaction: DESIRED_INTERACTION_PROPERTIES,
	message: DESIRED_MESSAGE_PROPERTIES,
	user: DESIRED_USER_PROPERTIES,
} as const satisfies DesiredProperties;

export const DESIRED_PROPERTIES_BEHAVIOR = DesiredPropertiesBehavior.RemoveKey;

export type DesiredProperties = RecursivePartial<TransformersDesiredProperties>;

export type DesiredGuildProperties = DesiredProperties['guild'];
export type DesiredInteractionProperties = DesiredProperties['interaction'];
export type DesiredMessageProperties = DesiredProperties['message'];
export type DesiredUserProperties = DesiredProperties['user'];
