import { type infer as _infer, base64, strictObject } from 'zod';

export const UpdateWelcomesConfigurationSchema = strictObject({
	data: base64(),
});

export type UpdateWelcomesConfigurationSchemaDto = _infer<typeof UpdateWelcomesConfigurationSchema>;
