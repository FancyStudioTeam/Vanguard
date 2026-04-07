import { IdentificationCardIcon } from '@phosphor-icons/react/dist/ssr';
import type { Guild } from '#types/Discord.ts';

export function SidebarHeaderInfo({ id, name }: SidebarHeaderInfoProps) {
	return (
		<ul className='min-w-0'>
			<li className='truncate font-bold'>{name}</li>
			<li className='flex items-center gap-2 text-neutral-400 text-sm'>
				<IdentificationCardIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<span className='truncate'>{id}</span>
			</li>
		</ul>
	);
}

export type SidebarHeaderInfoProps = Pick<Guild, 'id' | 'name'>;
