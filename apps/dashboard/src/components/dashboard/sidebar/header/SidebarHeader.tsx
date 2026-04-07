import type { Guild } from '#types/Discord.ts';
import { SidebarHeaderAvatar } from './SidebarHeaderAvatar.tsx';
import { SidebarHeaderInfo } from './SidebarHeaderInfo.tsx';

export function SidebarHeader(props: SidebarHeaderProps) {
	return (
		<header className='flex items-center gap-4'>
			<SidebarHeaderAvatar {...props} />
			<SidebarHeaderInfo {...props} />
		</header>
	);
}

export type SidebarHeaderProps = Pick<Guild, 'icon' | 'id' | 'name'>;
