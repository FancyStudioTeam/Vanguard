import { type HttpException, HttpStatus } from '@nestjs/common';

import { buildHttpException } from '#utils/Exceptions/buildHttpException.js';

export const UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE',
			message: 'Unable to exchange the authorization code with Discord',
		},
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	});

export const UNABLE_TO_GET_USER_INFORMATION_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'UNABLE_TO_GET_USER_INFORMATION',
			message: `Unable to get the user's information from Discord`,
		},
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	});
