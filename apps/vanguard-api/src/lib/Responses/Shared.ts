import { type HttpException, HttpStatus } from '@nestjs/common';

import { buildHttpException } from '#utils/Exceptions/buildHttpException.js';

export const FORBIDDEN_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'FORBIDDEN',
			message: '403: Forbidden',
		},
		statusCode: HttpStatus.FORBIDDEN,
	});

export const INTERNAL_SERVER_ERROR_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'INTERNAL_SERVER_ERROR',
			message: '500: Internal Server Error',
		},
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	});

export const MISSING_QUERY_STRING_PARAM_RESPONSE = (name: string): HttpException =>
	buildHttpException({
		data: {
			code: 'MISSING_QUERY_STRING_PARAM',
			details: {
				name,
			},
			message: `Missing query string param '${name}' from URL`,
		},
		statusCode: HttpStatus.BAD_REQUEST,
	});

export const NOT_FOUND_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'NOT_FOUND',
			message: '404: Not Found',
		},
		statusCode: HttpStatus.NOT_FOUND,
	});

export const UNAUTHORIZED_RESPONSE = (): HttpException =>
	buildHttpException({
		data: {
			code: 'UNAUTHORIZED',
			message: '401: Unauthorized',
		},
		statusCode: HttpStatus.UNAUTHORIZED,
	});
