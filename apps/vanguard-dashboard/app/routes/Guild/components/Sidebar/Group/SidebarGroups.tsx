import {
	BankFill,
	BlingFill,
	Book2Fill,
	ChartVertical2Fill,
	Gift2Fill,
	HistoryFill,
	IDcardFill,
	InviteFill,
	LaurelWreathFill,
	LayoutGridFill,
	Magic3Fill,
	RouteFill,
	SendFill,
	StarFill,
	TwitchFill,
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
			{
				disabled: true,
				href: `/dashboard/${guildId}/audit-logs`,
				icon: HistoryFill,
				name: 'Audit Logs',
			},
		],
	},
	{
		category: 'Essentials',
		items: [
			{
				disabled: true,
				href: `/dashboard/${guildId}/automations`,
				icon: RouteFill,
				name: 'Automations',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/logs`,
				icon: Book2Fill,
				name: 'Logs',
			},
			{
				href: `/dashboard/${guildId}/welcomes`,
				icon: WaveHandFill,
				name: 'Welcomes',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/suggestions`,
				icon: SendFill,
				name: 'Suggestions',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/tickets`,
				icon: InviteFill,
				name: 'Tickets',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/polls`,
				icon: ChartVertical2Fill,
				name: 'Polls',
			},
		],
	},
	{
		category: 'Social Media',
		items: [
			{
				disabled: true,
				href: `/dashboard/${guildId}/twitch`,
				icon: TwitchFill,
				name: 'Twitch',
			},
		],
	},
	{
		category: 'Engagement',
		items: [
			{
				disabled: true,
				href: `/dashboard/${guildId}/achievements`,
				icon: LaurelWreathFill,
				name: 'Achievements',
			},
			{
				disabled: true,
				href: `/dashboard/${guildId}/levels`,
				icon: BlingFill,
				name: 'Levels',
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
