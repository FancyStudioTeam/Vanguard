import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_TEXT,
} from '#lib/HttpStatus.ts';
import { createErrorJsonResponse } from '#utils/Responses/createErrorJsonResponse.ts';

export const INTERNAL_SERVER_ERROR_RESPONSE = () =>
	createErrorJsonResponse(INTERNAL_SERVER_ERROR_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_TEXT, {
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Something went wrong while processing your request',
	});
