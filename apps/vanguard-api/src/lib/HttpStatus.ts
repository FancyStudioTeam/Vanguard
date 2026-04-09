/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
 */
export enum HttpStatus {
	BadRequest = 400,
	InternalServerError = 500,
	Ok = 200,
	SeeOther = 303,
	TooManyRequests = 429,
	Unauthorized = 401,
	UnprocessableContent = 422,
}
