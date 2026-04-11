export function getCookieHeader(request: Request): string {
	const { headers } = request;
	const cookie = headers.get('Cookie');

	return cookie ?? '';
}
