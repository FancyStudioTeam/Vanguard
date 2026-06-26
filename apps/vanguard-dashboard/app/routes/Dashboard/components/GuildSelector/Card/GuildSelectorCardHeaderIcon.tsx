import type { DiscordGuild } from '@vanguard/api-contracts/interfaces';

import { ImageIcon } from '@phosphor-icons/react';

import { Avatar, AvatarFallback, AvatarImage } from '#components/UI/Avatar.tsx';

export function GuildSelectorCardHeaderIcon({ icon, id }: GuildSelectorCardHeaderIconProps) {
	return (
		<Avatar>
			<AvatarImage
				className='size-20 rounded-full border-4 border-neutral-800'
				src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512&animated=true`}
			/>
			<AvatarFallback className='size-20 border-4 border-neutral-800'>
				<ImageIcon
					className='size-10 shrink-0'
					weight='fill'
				/>
			</AvatarFallback>
		</Avatar>
	);
}

export type GuildSelectorCardHeaderIconProps = Pick<DiscordGuild, 'icon' | 'id'>;
