import { HttpException, type HttpStatus } from '@nestjs/common';

export function buildHttpException(options: BuildHttpExceptionOptions): HttpException {
	const { data, statusCode } = options;

	return new HttpException(data, statusCode);
}

interface BuildHttpExceptionOptions {
	data: HttpExceptionData;
	statusCode: HttpStatus;
}

interface HttpExceptionData {
	code: string;
	details?: Record<string, unknown>;
	message: string;
}
