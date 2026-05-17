import type { APIGuild } from '@vanguard/api-types/interfaces';

import { IdentificationCardIcon, ImageIcon } from '@phosphor-icons/react';

import { Avatar, AvatarFallback, AvatarImage } from '#components/UI/Avatar.tsx';

export function SidebarHeader({ icon, id, name }: SidebarHeaderProps) {
	return (
		<header className='flex items-center gap-2 rounded-md bg-neutral-800 p-2'>
			<Avatar className='bg-neutral-900'>
				<AvatarImage
					className='size-10'
					src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512`}
				/>
				<AvatarFallback className='size-10'>
					<ImageIcon
						className='size-5 shrink-0'
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
		</header>
	);
}

export type SidebarHeaderProps = Pick<APIGuild, 'icon' | 'id' | 'name'>;
