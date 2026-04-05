import { OK_STATUS_CODE, OK_STATUS_TEXT } from '#lib/HttpStatus.ts';
import type { AuthUser } from '#types/Auth.ts';
import { createJsonResponse } from '#utils/Responses/createJsonResponse.ts';

export const SESSION_RESPONSE = (authUser: AuthUser) =>
	createJsonResponse(OK_STATUS_CODE, OK_STATUS_TEXT, authUser);

export const UNAUTHORIZED_RESPONSE = () =>
	createJsonResponse(OK_STATUS_CODE, OK_STATUS_TEXT, null);
