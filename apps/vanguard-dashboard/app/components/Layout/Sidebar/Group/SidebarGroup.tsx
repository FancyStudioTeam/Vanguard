import { CaretUpDownIcon } from '@phosphor-icons/react';

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '#components/UI/Collapsible.tsx';
import { SidebarGroupItem, type SidebarGroupItemProps as SidebarGroupItemsInterface } from './SidebarGroupItem.tsx';

export function SidebarGroup({ category, items }: SidebarGroupProps) {
	return (
		<Collapsible defaultOpen={true}>
			<CollapsibleTrigger className='font-bold text-xs uppercase hover:bg-neutral-800'>
				<span className='truncate'>{category}</span>
				<CaretUpDownIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
			</CollapsibleTrigger>
			<CollapsiblePanel>
				<ul>
					{items.map(({ name, ...item }) => (
						<li key={name}>
							<SidebarGroupItem
								key={name}
								name={name}
								{...item}
							/>
						</li>
					))}
				</ul>
			</CollapsiblePanel>
		</Collapsible>
	);
}

export interface SidebarGroupProps {
	category: string;
	items: SidebarGroupItemsInterface[];
}
