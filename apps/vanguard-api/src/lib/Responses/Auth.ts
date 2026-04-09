// biome-ignore-all lint/style/useNamingConvention: (x)

import { type HttpException, HttpStatus } from '@nestjs/common';
import { buildHttpException } from '#utils/Exceptions/buildHttpException.js';

export function UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE(): HttpException {
	return buildHttpException({
		data: {
			code: 'UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE',
			message: 'Unable to exchange the authorization code with Discord',
		},
		statusCode: HttpStatus.BAD_REQUEST,
	});
}

export function UNABLE_TO_GET_USER_INFORMATION_RESPONSE(): HttpException {
	return buildHttpException({
		data: {
			code: 'UNABLE_TO_GET_USER_INFORMATION',
			message: `Unable to get the user's information from Discord`,
		},
		statusCode: HttpStatus.BAD_REQUEST,
	});
}
