import type { Guild } from '#server/lib/Types/API.ts';
import { SidebarHeader } from './SidebarHeader.tsx';

export function Sidebar({ guild }: SidebarProps) {
	return (
		<aside className='sticky top-26 flex h-[calc(100dvh-8rem)] w-80 shrink-0 flex-col gap-4 overflow-y-auto rounded-xl border-2 border-neutral-800 bg-neutral-900 p-6'>
			<SidebarHeader {...guild} />
		</aside>
	);
}

export interface SidebarProps {
	guild: Guild;
}
