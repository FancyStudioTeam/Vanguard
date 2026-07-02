import { object, string } from 'zod';

const CONTENT_MAXIMUM_LENGTH = 4_000;
const CONTENT_MINIMUM_LENGTH = 1;

export const MessageSchema = object({
	content: string().min(CONTENT_MINIMUM_LENGTH).max(CONTENT_MAXIMUM_LENGTH).optional(),
});
