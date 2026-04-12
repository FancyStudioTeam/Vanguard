// biome-ignore-all lint/style/useNamingConvention: (x)

import { type HttpException, HttpStatus } from '@nestjs/common';
import { buildHttpException } from '#utils/Exceptions/buildHttpException.js';

export function GUILD_NOT_FOUND_RESPONSE(): HttpException {
	return buildHttpException({
		data: {
			code: 'GUILD_NOT_FOUND',
			message: '404: Guild Not Found',
		},
		statusCode: HttpStatus.NOT_FOUND,
	});
}

export function INTERNAL_SERVER_ERROR_RESPONSE(): HttpException {
	return buildHttpException({
		data: {
			code: 'INTERNAL_SERVER_ERROR',
			message: '500: Internal Server Error',
		},
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	});
}

export function MISSING_QUERY_STRING_PARAM_RESPONSE(name: string): HttpException {
	return buildHttpException({
		data: {
			code: 'MISSING_QUERY_STRING_PARAM',
			details: {
				name,
			},
			message: `Missing query string param '${name}' from URL`,
		},
		statusCode: HttpStatus.BAD_REQUEST,
	});
}

export function UNAUTHORIZED_RESPONSE(): HttpException {
	return buildHttpException({
		data: {
			code: 'UNAUTHORIZED',
			message: '401: Unauthorized',
		},
		statusCode: HttpStatus.UNAUTHORIZED,
	});
}
