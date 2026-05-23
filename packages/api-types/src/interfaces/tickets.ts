// biome-ignore-all lint/style/useNamingConvention: (x)

import { GuildTicketPanelType } from '@vanguard/prisma';

export interface APIGuildTicketPanel {
	channel_id: string;
	channel_parent_id: string | null;
	enabled: boolean;
	panel_id: string;
	title: string;
	type: GuildTicketPanelType;
}

export interface APIGuildTicketsConfiguration {
	enabled: boolean;
	panels: APIGuildTicketPanel[];
}

export { GuildTicketPanelType };
