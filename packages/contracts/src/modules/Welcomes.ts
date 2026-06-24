import { array, boolean, literal, object, record, string, xor } from 'zod';

import { MessageSchema } from '#shared/Message.js';

export enum WelcomeMessageDeliveryType {
	Channel = 'CHANNEL',
	DirectMessage = 'DIRECT_MESSAGE',
	Webhook = 'WEBHOOK',
}

const MEMBER_NICKNAME_MAXIMUM_LENGTH = 50;
const MEMBER_NICKNAME_MINIMUM_LENGTH = 1;

const MEMBER_ROLES_MAXIMUM_LENGTH = 25;

const RECORD_KEY_MAXIMUM_LENGTH = 50;
const RECORD_KEY_MINIMUM_LENGTH = 5;

const SNOWFLAKE_REGEX = /^(?<id>\d{17,20})$/;

const WEBHOOK_NAME_MAXIMUM_LENGTH = 80;
const WEBHOOK_NAME_MINIMUM_LENGTH = 5;

export const MemberSchema = object({
	nickname: string()
		.nonempty()
		.min(MEMBER_NICKNAME_MINIMUM_LENGTH)
		.max(MEMBER_NICKNAME_MAXIMUM_LENGTH)
		.optional(),
	roles: array(string().nonempty().regex(SNOWFLAKE_REGEX))
		.max(MEMBER_ROLES_MAXIMUM_LENGTH)
		.optional()
		.default([]),
}).optional();

export const MessagesSchema = record(
	string().nonempty().min(RECORD_KEY_MINIMUM_LENGTH).max(RECORD_KEY_MAXIMUM_LENGTH),
	object({
		delivery: xor([
			object({
				channel_id: string().nonempty().regex(SNOWFLAKE_REGEX),
				type: literal(WelcomeMessageDeliveryType.Channel),
			}),
			object({
				name: string().nonempty(),
				type: literal(WelcomeMessageDeliveryType.Webhook),
			}),
		]),
		enabled: boolean().optional().default(true),
		message: MessageSchema,
	}),
);

export const TogglesSchema = object({
	ignore_bots: boolean().optional().default(true),
}).optional();

export const WebhooksSchema = record(
	string().nonempty().min(RECORD_KEY_MINIMUM_LENGTH).max(RECORD_KEY_MAXIMUM_LENGTH),
	object({
		channel_id: string().nonempty().regex(SNOWFLAKE_REGEX),
		name: string()
			.nonempty()
			.min(WEBHOOK_NAME_MINIMUM_LENGTH)
			.max(WEBHOOK_NAME_MAXIMUM_LENGTH)
			.optional()
			.default('Webhook'),
	}).optional(),
);

export const WelcomesSchema = object({
	member: MemberSchema,
	toggles: TogglesSchema,
	webhooks: WebhooksSchema,
});
