import type { DiscordGuild } from '@vanguard/api-contracts/interfaces';

import { IDcardFill, PicFill } from '@mingcute/react';

import { Avatar, AvatarFallback, AvatarImage } from '#components/UI/Avatar.tsx';

export function SidebarGuildInformation({ icon, id, name }: SidebarGuildInformationProps) {
	return (
		<section className='flex items-center gap-2 rounded-full bg-neutral-900 p-2'>
			<Avatar className='bg-neutral-800'>
				<AvatarImage
					className='size-10'
					src={`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512`}
				/>
				<AvatarFallback className='size-10'>
					<PicFill className='size-5 shrink-0' />
				</AvatarFallback>
			</Avatar>
			<ul className='min-w-0'>
				<li className='truncate font-bold'>{name}</li>
				<li className='flex items-center gap-2 text-neutral-400 text-sm'>
					<IDcardFill className='size-5 shrink-0' />
					<span className='truncate'>{id}</span>
				</li>
			</ul>
		</section>
	);
}

export type SidebarGuildInformationProps = Pick<DiscordGuild, 'icon' | 'id' | 'name'>;
