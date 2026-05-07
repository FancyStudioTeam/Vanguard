import type { MediaGalleryItem as MediaGalleryItemInterface, UnfurledMediaItem as UnfurledMediaItemInterface } from '@discordeno/bot';

export function MediaGalleryItem({ children, description, spoiler }: MediaGalleryItemProps): MediaGalleryItemInterface {
	return {
		description,
		media: children,
		spoiler,
	};
}

export interface MediaGalleryItemProps extends Pick<MediaGalleryItemInterface, 'description' | 'spoiler'> {
	children: UnfurledMediaItemInterface;
}
