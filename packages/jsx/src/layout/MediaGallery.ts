import {
	type MediaGalleryComponent as MediaGalleryComponentInterface,
	type MediaGalleryItem as MediaGalleryItemInterface,
	MessageComponentTypes,
} from '@discordeno/bot';

import { flattenChildren } from '#utils/flattenChildren.js';

export function MediaGallery({ children }: MediaGalleryProps): MediaGalleryComponentInterface {
	const items = flattenChildren(children);

	return {
		items,
		type: MessageComponentTypes.MediaGallery,
	};
}

export interface MediaGalleryProps {
	children: MediaGalleryItemInterface | MediaGalleryItemInterface[];
}
