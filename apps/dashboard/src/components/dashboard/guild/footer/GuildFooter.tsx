import type { UserGuild } from '#types/Discord.ts';
import { GuildFooterAvatar } from './GuildFooterAvatar.tsx';
import { GuildFooterInfo } from './GuildFooterInfo.tsx';

export function GuildFooter(props: GuildFooterProps) {
	return (
		<footer className='flex h-25 items-center gap-4 p-6'>
			<GuildFooterAvatar {...props} />
			<GuildFooterInfo {...props} />
		</footer>
	);
}

export type GuildFooterProps = Pick<UserGuild, 'icon' | 'id' | 'name'>;
