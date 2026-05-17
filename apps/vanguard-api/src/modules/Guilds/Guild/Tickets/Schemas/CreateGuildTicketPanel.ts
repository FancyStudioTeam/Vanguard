import { object, string, type infer as ZodInfer } from 'zod';

const TITLE_MAX_LENGTH = 50;
const TITLE_MIN_LENGTH = 5;

const BODY_PAYLOAD_MUST_BE_OBJECT = 'Object payload must be an object' as const;

const CHANNEL_ID_MUST_BE_STRING = 'Channel ID must be an string' as const;

const TITLE_MUST_BE_STRING = 'Title must be a string';

const TITLE_MUST_HAVE_MAX_LENGTH = `Title must have a maximum length of ${TITLE_MAX_LENGTH} characters` as const;
const TITLE_MUST_HAVE_MIN_LENGTH = `Title must have a minimum length of ${TITLE_MIN_LENGTH} characters` as const;

export const CreateGuildTicketPanelSchema = object(
	{
		channel_id: string(CHANNEL_ID_MUST_BE_STRING),
		title: string(TITLE_MUST_BE_STRING)
			.min(TITLE_MIN_LENGTH, TITLE_MUST_HAVE_MIN_LENGTH)
			.max(TITLE_MAX_LENGTH, TITLE_MUST_HAVE_MAX_LENGTH),
	},
	BODY_PAYLOAD_MUST_BE_OBJECT,
);

export type CreateGuildTicketPanelSchemaDto = ZodInfer<typeof CreateGuildTicketPanelSchema>;
