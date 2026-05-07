import type { Guild } from '#server/lib/Types/API.ts';
import { SidebarGroups } from './Group/SidebarGroups.tsx';
import { SidebarHeader } from './SidebarHeader.tsx';
import { SidebarSeparator } from './SidebarSeparator.tsx';

export function Sidebar({ guild }: SidebarProps) {
	const { id: guildId } = guild;

	return (
		<aside className='sticky top-26 flex h-[calc(100dvh-8rem)] w-80 shrink-0 flex-col gap-4 overflow-y-auto rounded-xl border-2 border-neutral-800 bg-neutral-900 p-6'>
			<SidebarHeader {...guild} />
			<SidebarSeparator />
			<SidebarGroups guildId={guildId} />
		</aside>
	);
}

export interface SidebarProps {
	guild: Guild;
}
