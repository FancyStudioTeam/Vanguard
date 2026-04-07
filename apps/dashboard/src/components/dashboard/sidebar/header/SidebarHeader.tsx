import type { Guild } from '#types/Discord.ts';
import { SidebarHeaderAvatar } from './SidebarHeaderAvatar.tsx';
import { SidebarHeaderInfo } from './SidebarHeaderInfo.tsx';

export function SidebarHeader(props: SidebarHeaderProps) {
	return (
		<header className='flex items-center gap-2 rounded-md bg-neutral-800 p-2'>
			<SidebarHeaderAvatar {...props} />
			<SidebarHeaderInfo {...props} />
		</header>
	);
}

export type SidebarHeaderProps = Pick<Guild, 'icon' | 'id' | 'name'>;
