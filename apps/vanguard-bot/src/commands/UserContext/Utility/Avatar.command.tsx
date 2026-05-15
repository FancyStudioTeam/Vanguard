import type { User } from '@vanguard/discord-config/inferred-types';
import { UserContextHandler } from '@vanguard/discord-handlers/commands';
import { Declare } from '@vanguard/discord-handlers/decorators';
import { Container, MediaGallery, MediaGalleryItem, UnfurledMediaItem } from '@vanguard/discord-jsx';

import { avatarUrl, type ContainerComponent, defaultAvatarUrl, MessageFlags } from '@discordeno/bot';

@Declare({
	name: 'Avatar',
})
export default class AvatarCommand extends UserContextHandler {
	public async run() {
		const targetUser = super.getTargetUser();
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
