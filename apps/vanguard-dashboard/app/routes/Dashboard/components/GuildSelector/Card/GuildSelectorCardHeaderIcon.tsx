import type { DiscordGuild } from '@vanguard/api-contracts/interfaces';

import { PicFill } from '@mingcute/react';

import { Avatar, AvatarFallback, AvatarImage } from '#components/UI/Avatar.tsx';

export function GuildSelectorCardHeaderIcon({ icon, id }: GuildSelectorCardHeaderIconProps) {
	return (
		<Avatar>
			<AvatarImage
				className='size-20 rounded-full border-4 border-neutral-50'
				src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512&animated=true`}
			/>
			<AvatarFallback className='size-20 border-4 border-neutral-50'>
				<PicFill className='size-10 shrink-0' />
			</AvatarFallback>
		</Avatar>
	);
}

export type GuildSelectorCardHeaderIconProps = Pick<DiscordGuild, 'icon' | 'id'>;
