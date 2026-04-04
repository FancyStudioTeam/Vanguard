import { IdentificationCardIcon, ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/Avatar.tsx';
import type { UserGuild } from '#/lib/types/User.ts';

export function GuildCardFooter({ icon, id, name }: GuildCardFooterProps) {
	const guildIconUrl = `https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512`;

	return (
		<footer className='flex h-25 items-center gap-4 p-6'>
			<Avatar>
				<AvatarImage
					className='size-15 bg-neutral-800'
					src={guildIconUrl}
				/>
				<AvatarFallback className='size-15'>
					<ImageIcon
						className='size-10 shrink-0'
						weight='fill'
					/>
				</AvatarFallback>
			</Avatar>
			<ul className='min-w-0'>
				<li className='truncate font-bold'>{name}</li>
				<li className='flex items-center gap-1 text-neutral-400 text-sm'>
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

export type GuildCardFooterProps = Pick<UserGuild, 'icon' | 'id' | 'name'>;
