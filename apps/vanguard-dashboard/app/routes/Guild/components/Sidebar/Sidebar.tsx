import type { APIGuild } from '@vanguard/api-contracts/interfaces';

import { SidebarGroups } from './Group/SidebarGroups.tsx';
import { SidebarGuildInformation } from './SidebarGuildInformation.tsx';
import { SidebarHeader } from './SidebarHeader.tsx';

export function Sidebar({ guild }: SidebarProps) {
	const { id: guildId } = guild;

	return (
		<aside className='scrollbar-gutter-stable absolute top-0 hidden h-dvh w-90 flex-col gap-4 overflow-y-auto p-8 md:flex'>
			<SidebarHeader />
			<SidebarGuildInformation {...guild} />
			<SidebarGroups guildId={guildId} />
		</aside>
	);
}

export interface SidebarProps {
	guild: APIGuild;
}
