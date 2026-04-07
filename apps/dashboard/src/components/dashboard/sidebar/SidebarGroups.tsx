'use client';

import { GridFourIcon } from '@phosphor-icons/react';
import {
	SidebarGroup,
	type SidebarGroupProps as SidebarGroupInterface,
} from './group/SidebarGroup.tsx';
import type { SidebarProps } from './Sidebar.tsx';

const SIDEBAR_GROUPS: (guildId: string) => SidebarGroupInterface[] = (
	guildId,
) => [
	{
		links: [
			{
				href: `/dashboard/${guildId}`,
				icon: GridFourIcon,
				text: 'Dashboard',
			},
		],
		name: 'General',
	},
];

export function SidebarGroups({ id }: SidebarGroupsProps) {
	return SIDEBAR_GROUPS(id).map(({ name, ...group }) => (
		<SidebarGroup
			key={name}
			name={name}
			{...group}
		/>
	));
}

export type SidebarGroupsProps = Pick<SidebarProps['guild'], 'id'>;
