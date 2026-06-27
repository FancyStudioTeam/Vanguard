import { LayoutGridFill, Magic3Fill, WaveHandFill } from '@mingcute/react';

import { SidebarGroup, type SidebarGroupProps as SidebarGroupInterface } from './SidebarGroup.tsx';

const SIDEBAR_GROUPS_ITEMS = (guildId: string): SidebarGroupInterface[] => [
	{
		category: 'Management',
		items: [
			{
				href: `/dashboard/${guildId}`,
				icon: LayoutGridFill,
				name: 'Dashboard',
			},
			{
				href: `/dashboard/${guildId}/customization`,
				icon: Magic3Fill,
				name: 'Bot Customization',
			},
		],
	},
	{
		category: 'Essentials',
		items: [
			{
				href: `/dashboard/${guildId}/welcomes`,
				icon: WaveHandFill,
				name: 'Welcomes',
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
