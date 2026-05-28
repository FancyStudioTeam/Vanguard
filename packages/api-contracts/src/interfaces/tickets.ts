import { GuildTicketPanelType } from '@vanguard/prisma';

export interface PrismaGuildTicketPanel {
	channel_id: string;
	channel_parent_id: string | null;
	enabled: boolean;
	panel_id: string;
	title: string;
	type: GuildTicketPanelType;
}

export interface PrismaGuildTicketsConfiguration {
	enabled: boolean;
	panels: PrismaGuildTicketPanel[];
}

export { GuildTicketPanelType };
