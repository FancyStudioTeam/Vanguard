export enum ErrorCodes {
	BadRequest = 'BAD_REQUEST',
	Forbidden = 'FORBIDDEN',
	InternalServerError = 'INTERNAL_SERVER_ERROR',
	MissingOAuth2AuthorizationCode = 'MISSING_OAUTH2_AUTHORIZATION_CODE',
	NotFound = 'NOT_FOUND',
	UnableToExchangeAuthorizationCode = 'UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE',
	UnableToRetrieveUserInformation = 'UNABLE_TO_RETRIEVE_USER_INFORMATION',
	Unauthorized = 'UNAUTHORIZED',
	ValidationError = 'VALIDATION_ERROR',
}
