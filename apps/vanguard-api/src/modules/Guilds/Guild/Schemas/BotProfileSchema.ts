import { type infer as _infer, strictObject, string } from 'zod';

const BIOGRAPHY_MAXIMUM_LENGTH = 190;
const BIOGRAPHY_MINIMUM_LENGTH = 1;

const NICKNAME_MAXIMUM_LENGTH = 32;
const NICKNAME_MINIMUM_LENGTH = 1;

export const UpdateBotProfileSchema = strictObject({
	biography: string().min(BIOGRAPHY_MINIMUM_LENGTH).max(BIOGRAPHY_MAXIMUM_LENGTH).nullable(),
	nickname: string().min(NICKNAME_MINIMUM_LENGTH).max(NICKNAME_MAXIMUM_LENGTH).nullable(),
});

export type UpdateBotProfileSchemaDto = _infer<typeof UpdateBotProfileSchema>;
