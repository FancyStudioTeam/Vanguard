// biome-ignore-all lint/style/useNamingConvention: (x)

export interface APIGuildTicketPanel {
	channel_id: string;
	channel_parent_id: string | null;
	enabled: boolean;
	panel_id: string;
	title: string;
	type: unknown;
}

export interface APIGuildTicketsConfiguration {
	enabled: boolean;
	panels: APIGuildTicketPanel[];
}
