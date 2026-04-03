import 'server-only';
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_TEXT,
	OK_STATUS_CODE,
	OK_STATUS_TEXT,
} from '#/lib/HttpStatus.ts';
import type { SessionEndpointDataResponse } from '#/lib/responses/Auth.ts';
import { createErrorJsonResponse } from '#/utils/createErrorJsonResponse.ts';
import { createJsonResponse } from '#/utils/createJsonResponse.ts';

export const INTERNAL_SERVER_ERROR_RESPONSE = () =>
	createErrorJsonResponse(INTERNAL_SERVER_ERROR_STATUS_CODE, INTERNAL_SERVER_ERROR_STATUS_TEXT, {
		code: 'INTERNAL_SERVER_ERROR',
		message: 'Something went wrong while processing your request',
	});

export const SESSION_RESPONSE = (user: SessionEndpointDataResponse) =>
	createJsonResponse(OK_STATUS_CODE, OK_STATUS_TEXT, {
		user,
	});

export const UNAUTHORIZED_RESPONSE = () => createJsonResponse(OK_STATUS_CODE, OK_STATUS_TEXT, null);
