import { ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/Avatar.tsx';
import type { SidebarHeaderProps } from './SidebarHeader.tsx';

export function SidebarHeaderAvatar({ icon, id }: SidebarHeaderAvatarProps) {
	const guildIconUrl = `https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=512`;

	return (
		<Avatar>
			<AvatarImage
				className='size-10 bg-neutral-800'
				src={guildIconUrl}
			/>
			<AvatarFallback className='size-10'>
				<ImageIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
			</AvatarFallback>
		</Avatar>
	);
}

export type SidebarHeaderAvatarProps = Pick<SidebarHeaderProps, 'icon' | 'id'>;
