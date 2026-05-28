export interface PrismaGuildTicketPanel {
	channel_id: string;
	channel_parent_id: string | null;
	enabled: boolean;
	panel_id: string;
	title: string;
	type: unknown;
}

export interface PrismaGuildTicketsConfiguration {
	enabled: boolean;
	panels: PrismaGuildTicketPanel[];
}
