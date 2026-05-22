export function normalizeUrl(url: string): string {
	const { host, protocol } = new URL(url);

	return `${protocol}//${host}`;
}
