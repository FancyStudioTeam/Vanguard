import type { User } from '@vanguard/discord-config/inferred-types';
import { UserContextHandler } from '@vanguard/discord-handlers/commands';
import { Declare } from '@vanguard/discord-handlers/decorators';
import {
	Container,
	MediaGallery,
	MediaGalleryItem,
	UnfurledMediaItem,
} from '@vanguard/discord-jsx';

import { type ContainerComponent, displayAvatarUrl, MessageFlags } from '@discordeno/bot';

@Declare({
	name: 'Avatar',
})
export default class AvatarCommand extends UserContextHandler {
	public async run(): Promise<void> {
		const targetUser = super.getTargetUser();
		const targetUserAvatarUrl = this.getUserAvatarUrl(targetUser);

		const containerComponent = this.createContainerComponent(targetUserAvatarUrl);

		await super.createInteractionMessage({
			components: [
				containerComponent,
			],
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
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
		return displayAvatarUrl(id, discriminator, avatar, {
			format: 'webp',
			size: 1_024,
		});
	}
}
