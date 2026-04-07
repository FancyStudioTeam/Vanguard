import { guildIconUrl } from '@discordeno/utils';
import { ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/Avatar.tsx';
import type { SidebarHeaderProps } from './SidebarHeader.tsx';

export function SidebarHeaderAvatar({ icon, id }: SidebarHeaderAvatarProps) {
	return (
		<Avatar className='size-10 bg-neutral-800'>
			<AvatarImage
				src={guildIconUrl(id, icon ?? undefined, {
					format: 'webp',
					size: 512,
				})}
			/>
			<AvatarFallback>
				<ImageIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
			</AvatarFallback>
		</Avatar>
	);
}

export type SidebarHeaderAvatarProps = Pick<SidebarHeaderProps, 'icon' | 'id'>;
