import { VanguardCombinationMark } from '#components/shared/branding/VanguardCombinationMark.tsx';

export function Sidebar({ guildId }: SidebarProps) {
	return (
		<aside className='fixed inset-0 flex h-dvh w-100 flex-col gap-6 border-neutral-800 border-r-2 bg-neutral-950 p-8'>
			<VanguardCombinationMark />
		</aside>
	);
}

export interface SidebarProps {
	guildId: string;
}
