import { object, string } from 'zod';

export const MessageSchema = object({
	content: string().optional(),
});
