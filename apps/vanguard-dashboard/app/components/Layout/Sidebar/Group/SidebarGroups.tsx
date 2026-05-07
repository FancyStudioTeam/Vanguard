import { TicketIcon } from '@phosphor-icons/react/dist/ssr';

import { SidebarGroup, type SidebarGroupProps as SidebarGroupInterface } from './SidebarGroup.tsx';

const SIDEBAR_GROUPS_ITEMS = (guildId: string): SidebarGroupInterface[] => [
	{
		category: 'Management',
		items: [
			{
				href: `/dashboard/${guildId}/tickets`,
				icon: TicketIcon,
				name: 'Tickets',
			},
		],
	},
];

export function SidebarGroups({ guildId }: SidebarGroupsProps) {
	return SIDEBAR_GROUPS_ITEMS(guildId).map(({ category, items }) => (
		<SidebarGroup
			category={category}
			items={items}
			key={category}
		/>
	));
}

export interface SidebarGroupsProps {
	guildId: string;
}
