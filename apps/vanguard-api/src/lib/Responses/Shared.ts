// biome-ignore-all lint/style/useNamingConvention: (x)

import { HttpException, HttpStatus } from '@nestjs/common';

export function INTERNAL_SERVER_ERROR_RESPONSE(): HttpException {
	return new HttpException(
		{
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Something went wrong while processing your request. Please try again in a few seconds.',
		},
		HttpStatus.INTERNAL_SERVER_ERROR,
	);
}

export function MISSING_QUERY_STRING_PARAM_RESPONSE(name: string): HttpException {
	return new HttpException(
		{
			code: 'MISSING_QUERY_STRING_PARAM',
			details: {
				name,
			},
			message: `Missing query string param '${name}' from URL`,
		},
		HttpStatus.BAD_REQUEST,
	);
}
