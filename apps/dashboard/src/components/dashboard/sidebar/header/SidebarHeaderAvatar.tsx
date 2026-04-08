import { guildIconUrl } from '@discordeno/utils';
import { ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/Avatar.tsx';
import type { SidebarHeaderProps } from './SidebarHeader.tsx';

export function SidebarHeaderAvatar({ icon, id }: SidebarHeaderAvatarProps) {
	return (
		<Avatar className='bg-neutral-900'>
			<AvatarImage
				className='size-10'
				src={guildIconUrl(id, icon ?? undefined, {
					format: 'webp',
					size: 512,
				})}
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
