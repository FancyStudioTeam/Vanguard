import {
	avatarUrl,
	type ContainerComponent,
	defaultAvatarUrl,
	MessageFlags,
} from '@discordeno/bot';
import { UserContextCommandHandler } from '#handlers/commands/structures/UserContextCommandHandler.js';
import { Declare } from '#handlers/decorators/Declare.js';
import { Container, MediaGallery, MediaGalleryItem, UnfurledMediaItem } from '#jsx/components.js';
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
			flags: MessageFlags.IsComponentsV2,
		});
	}

	private createContainerComponent(avatarUrl: string): ContainerComponent {
		return (
			<Container>
				<MediaGallery>
					<MediaGalleryItem>
						<UnfurledMediaItem url={avatarUrl} />
					</MediaGalleryItem>
				</MediaGallery>
			</Container>
		);
	}

	private getUserAvatarUrl({ avatar, discriminator, id }: User): string {
		if (!avatar) {
			return defaultAvatarUrl(id, discriminator);
		}

		return avatarUrl(id, avatar, {
			format: 'webp',
			size: 1024,
		});
	}
}
