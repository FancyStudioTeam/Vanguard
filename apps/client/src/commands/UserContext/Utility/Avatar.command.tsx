import {
	avatarUrl,
	type ContainerComponent,
	defaultAvatarUrl,
	type MediaGalleryComponent,
	MessageComponentTypes,
	MessageFlags,
	type UnfurledMediaItem,
} from '@discordeno/bot';
import { UserContextCommandHandler } from '#handlers/commands/structures/UserContextCommandHandler.js';
import { Declare } from '#handlers/decorators/Declare.js';
import type { User } from '#lib/InferredTypes.js';

@Declare({
	name: 'Avatar',
})
export default class AvatarCommand extends UserContextCommandHandler {
	public async run() {
		const targetUser = this.getTargetUser();
		const targetUserAvatarUrl = this.getUserAvatarUrl(targetUser);

		const containerComponent = this.createContainerComponent(targetUserAvatarUrl);

		await this.createInteractionMessage({
			components: [
				containerComponent,
			],
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	}

	private createContainerComponent(avatarUrl: string): ContainerComponent {
		const mediaGalleryComponent = this.createMediaGalleryComponent(avatarUrl);

		return {
			components: [
				mediaGalleryComponent,
			],
			type: MessageComponentTypes.Container,
		};
	}

	private createMediaGalleryComponent(avatarUrl: string): MediaGalleryComponent {
		const unfurledMediaItem = this.createUnfurledMediaItem(avatarUrl);

		return {
			items: [
				{
					media: unfurledMediaItem,
				},
			],
			type: MessageComponentTypes.MediaGallery,
		};
	}

	private createUnfurledMediaItem(avatarUrl: string): UnfurledMediaItem {
		return {
			url: avatarUrl,
		};
	}

	private getUserAvatarUrl(user: User): string {
		const { avatar, discriminator, id } = user;

		if (!avatar) {
			return defaultAvatarUrl(id, discriminator);
		}

		return avatarUrl(id, avatar, {
			format: 'webp',
			size: 1024,
		});
	}
}
