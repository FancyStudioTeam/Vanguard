import type { UnfurledMediaItem as UnfurledMediaItemInterface } from '@discordeno/bot';

export function UnfurledMediaItem({
	attachmentId,
	contentType,
	height,
	proxyUrl,
	url,
	width,
}: UnfurledMediaItemProps): UnfurledMediaItemInterface {
	return {
		attachmentId,
		contentType,
		height,
		proxyUrl,
		url,
		width,
	};
}

export type UnfurledMediaItemProps = UnfurledMediaItemInterface;
