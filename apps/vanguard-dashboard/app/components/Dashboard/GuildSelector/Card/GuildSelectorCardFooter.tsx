import type { APIUserGuild } from '@vanguard/api-types/interfaces';

import { IdentificationCardIcon, ImageIcon } from '@phosphor-icons/react';

import { Avatar, AvatarFallback, AvatarImage } from '#components/UI/Avatar.tsx';

export function GuildSelectorCardFooter({ icon, id, name }: GuildSelectorCardFooterProps) {
	return (
		<footer className='flex h-25 items-center gap-4 p-6'>
			<Avatar className='bg-neutral-900'>
				<AvatarImage
					className='size-15 border-2 border-neutral-800'
					src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512`}
				/>
				<AvatarFallback className='size-15 border-2 border-neutral-800'>
					<ImageIcon
						className='size-10 shrink-0'
						weight='fill'
					/>
				</AvatarFallback>
			</Avatar>
			<ul className='min-w-0'>
				<li className='truncate font-bold'>{name}</li>
				<li className='flex items-center gap-2 text-neutral-400 text-sm'>
					<IdentificationCardIcon
						className='size-5 shrink-0'
						weight='fill'
					/>
					<span className='truncate'>{id}</span>
				</li>
			</ul>
		</footer>
	);
}

export type GuildSelectorCardFooterProps = Pick<APIUserGuild, 'icon' | 'id' | 'name'>;
