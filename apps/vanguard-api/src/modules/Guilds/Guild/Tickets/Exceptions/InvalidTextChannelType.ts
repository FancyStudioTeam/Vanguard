import { HttpStatus } from '@nestjs/common';

import { buildHttpException } from '#utils/Exceptions/buildHttpException.js';

export const InvalidTextChannelTypeException = () =>
	buildHttpException({
		data: {
			code: 'INVALID_TEXT_CHANNEL_TYPE',
			message: 'Channel must be a text channel',
		},
		statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
	});
