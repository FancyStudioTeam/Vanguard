import {
	type ContainerComponent,
	type MediaGalleryComponent,
	type MediaGalleryItem as MediaGalleryItemInterface,
	MessageComponentTypes,
	type SeparatorComponent,
	type TextDisplayComponent,
	type UnfurledMediaItem as UnfurledMediaItemInterface,
} from '@discordeno/bot';

export function Container({ accentColor, children, spoiler }: ContainerProps): ContainerComponent {
	let components: ContainerChildComponent[] = [];

	if (Array.isArray(children)) {
		components = children.flat();
	} else {
		components = [
			children,
		];
	}

	return {
		accentColor,
		components,
		spoiler,
		type: MessageComponentTypes.Container,
	};
}

export function MediaGallery({ children }: MediaGalleryProps): MediaGalleryComponent {
	let items: MediaGalleryItemInterface[] = [];

	if (Array.isArray(children)) {
		items = children.flat();
	} else {
		items = [
			children,
		];
	}

	return {
		items,
		type: MessageComponentTypes.MediaGallery,
	};
}

export function MediaGalleryItem({
	children,
	description,
	spoiler,
}: MediaGalleryItemProps): MediaGalleryItemInterface {
	return {
		description,
		media: children,
		spoiler,
	};
}

export function Separator({ divider, spacing }: SeparatorProps): SeparatorComponent {
	return {
		divider,
		spacing,
		type: MessageComponentTypes.Separator,
	};
}

export function TextDisplay({ children }: TextDisplayProps): TextDisplayComponent {
	return {
		content: children,
		type: MessageComponentTypes.TextDisplay,
	};
}

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

interface ContainerProps extends Pick<ContainerComponent, 'accentColor' | 'spoiler'> {
	children: ContainerChildComponent[];
}

interface MediaGalleryItemProps extends Pick<MediaGalleryItemInterface, 'description' | 'spoiler'> {
	children: UnfurledMediaItemInterface;
}

interface MediaGalleryProps {
	children: MediaGalleryItemInterface[];
}

interface TextDisplayProps {
	children: string;
}

type ContainerChildComponent = ContainerComponent['components'][number];

type SeparatorProps = Pick<SeparatorComponent, 'divider' | 'spacing'>;
type UnfurledMediaItemProps = UnfurledMediaItemInterface;
