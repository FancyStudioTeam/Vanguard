import {
	AwardFill,
	BankFill,
	BlingFill,
	Gift2Fill,
	IDcardFill,
	LayoutGridFill,
	LifebuoyFill,
	Magic3Fill,
	MailboxFill,
	StarFill,
	VIP1Fill,
	WaveHandFill,
	World2Fill,
} from '@mingcute/react';

import { SidebarGroup, type SidebarGroupProps as SidebarGroupInterface } from './SidebarGroup.tsx';

const SIDEBAR_GROUPS_ITEMS = (guildId: string): SidebarGroupInterface[] => [
	{
		category: 'Management',
		items: [
			{
				href: `/dashboard/${guildId}`,
				icon: LayoutGridFill,
				name: 'Overview',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/access-management`,
				icon: IDcardFill,
				name: 'Access Management',
			},
			{
				href: `/dashboard/${guildId}/customization`,
				icon: Magic3Fill,
				name: 'Customization',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/discovery`,
				icon: World2Fill,
				name: 'Discovery',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/membership`,
				icon: VIP1Fill,
				name: 'Membership',
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
			{
				disabled: true,
				href: `/dashboard/${guildId}/suggestions`,
				icon: MailboxFill,
				name: 'Suggestions',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/tickets`,
				icon: LifebuoyFill,
				name: 'Tickets',
			},
		],
	},
	{
		category: 'Engagement',
		items: [
			{
				disabled: true,
				href: `/dashboard/${guildId}/levels`,
				icon: BlingFill,
				name: 'Levels',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/achievements`,
				icon: AwardFill,
				name: 'Achievements',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/giveaways`,
				icon: Gift2Fill,
				name: 'Giveaways',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/starboard`,
				icon: StarFill,
				name: 'Starboard',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/economy`,
				icon: BankFill,
				name: 'Economy',
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
