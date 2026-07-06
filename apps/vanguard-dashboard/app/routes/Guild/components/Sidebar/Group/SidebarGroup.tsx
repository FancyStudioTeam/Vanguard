import { ButtonVariants } from '@vanguard/ui/Button.js';

import { DownFill } from '@mingcute/react';

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '#components/UI/Collapsible.tsx';
import {
	SidebarGroupItem,
	type SidebarGroupItemProps as SidebarGroupItemsInterface,
} from './SidebarGroupItem.tsx';

export function SidebarGroup({ category, items }: SidebarGroupProps) {
	return (
		<Collapsible defaultOpen={true}>
			<CollapsibleTrigger
				className={ButtonVariants({
					className:
						'justify-between font-bold text-xs uppercase [&>svg]:rotate-90 data-panel-open:[&>svg]:rotate-0',
					variant: 'ghost',
				})}
			>
				<span className='truncate'>{category}</span>
				<DownFill className='size-5 shrink-0 transition-transform duration-300' />
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
