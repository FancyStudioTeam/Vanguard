import { guildIconUrl } from '@discordeno/utils';
import { ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/Avatar.tsx';
import type { GuildFooterProps } from './GuildFooter.tsx';

export function GuildFooterAvatar({ id, icon }: GuildFooterAvatarProps) {
	return (
		<Avatar className='bg-red-800'>
			<AvatarImage
				className='size-15'
				src={guildIconUrl(id, icon ?? undefined, {
					format: 'webp',
					size: 512,
				})}
			/>
			<AvatarFallback className='size-15'>
				<ImageIcon
					className='size-10 shrink-0'
					weight='fill'
				/>
			</AvatarFallback>
		</Avatar>
	);
}

export type GuildFooterAvatarProps = Pick<GuildFooterProps, 'id' | 'icon'>;
