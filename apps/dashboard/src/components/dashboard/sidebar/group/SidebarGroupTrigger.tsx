import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr';
import { CollapsibleTrigger } from '#components/ui/Collapsible.tsx';
import type { SidebarGroupProps } from './SidebarGroup.tsx';

export function SidebarGroupTrigger({ name }: SidebarGroupTriggerProps) {
	return (
		<CollapsibleTrigger className='justify-between px-4 py-2 font-bold uppercase'>
			<span className='truncate'>{name}</span>
			<CaretUpDownIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
		</CollapsibleTrigger>
	);
}

export type SidebarGroupTriggerProps = Pick<SidebarGroupProps, 'name'>;
